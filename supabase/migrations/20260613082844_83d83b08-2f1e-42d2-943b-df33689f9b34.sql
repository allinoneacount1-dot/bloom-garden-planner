-- 1. Roles enum + table + has_role helper
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users read own roles" ON public.user_roles;
CREATE POLICY "Users read own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- 2. Profiles: re-link to auth.users
ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS email text;

-- Make profiles.id reference auth.users (drop wallet NOT NULL since email-based auth doesn't require it)
ALTER TABLE public.profiles ALTER COLUMN wallet DROP NOT NULL;

-- Drop old placeholder policies
DROP POLICY IF EXISTS "Profile reads via server only (placeholder)" ON public.profiles;
DROP POLICY IF EXISTS "Profile writes via server only (placeholder)" ON public.profiles;
DROP POLICY IF EXISTS "Profile updates via server only (placeholder)" ON public.profiles;
DROP POLICY IF EXISTS "Profile deletes via server only (placeholder)" ON public.profiles;

CREATE POLICY "Users read own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, handle)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'handle', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'user')
  ON CONFLICT DO NOTHING;
  RETURN NEW;
END; $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. Numina ownership
ALTER TABLE public.numina ADD COLUMN IF NOT EXISTS owner_id uuid REFERENCES auth.users(id) ON DELETE CASCADE;
ALTER TABLE public.numina ALTER COLUMN owner_wallet DROP NOT NULL;
CREATE INDEX IF NOT EXISTS numina_owner_id_idx ON public.numina(owner_id);

DROP POLICY IF EXISTS "Numina writes via server only (placeholder)" ON public.numina;
CREATE POLICY "Users view own numina" ON public.numina
  FOR SELECT TO authenticated USING (auth.uid() = owner_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Users insert own numina" ON public.numina
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users update own numina" ON public.numina
  FOR UPDATE TO authenticated USING (auth.uid() = owner_id) WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Users delete own numina" ON public.numina
  FOR DELETE TO authenticated USING (auth.uid() = owner_id);

-- 4. Actions scoped via parent numen
DROP POLICY IF EXISTS "Actions writes via server only (placeholder)" ON public.actions;
CREATE POLICY "Users view actions on own numina" ON public.actions
  FOR SELECT TO authenticated USING (
    EXISTS (SELECT 1 FROM public.numina n WHERE n.id = actions.numen_id AND n.owner_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );
CREATE POLICY "Users insert actions on own numina" ON public.actions
  FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.numina n WHERE n.id = actions.numen_id AND n.owner_id = auth.uid())
  );

-- 5. Strategies authorship
ALTER TABLE public.strategies ADD COLUMN IF NOT EXISTS author_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS strategies_author_id_idx ON public.strategies(author_id);

DROP POLICY IF EXISTS "Strategy writes via server only (placeholder)" ON public.strategies;
DROP POLICY IF EXISTS "Strategy updates via server only (placeholder)" ON public.strategies;
DROP POLICY IF EXISTS "Strategy deletes via server only (placeholder)" ON public.strategies;
CREATE POLICY "Signed-in users create strategies" ON public.strategies
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors update own strategies" ON public.strategies
  FOR UPDATE TO authenticated USING (auth.uid() = author_id) WITH CHECK (auth.uid() = author_id);
CREATE POLICY "Authors delete own strategies" ON public.strategies
  FOR DELETE TO authenticated USING (auth.uid() = author_id);

-- 6. Activity: tighten writes (was placeholder), keep public reads
ALTER TABLE public.activity ADD COLUMN IF NOT EXISTS user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
GRANT INSERT ON public.activity TO authenticated;
CREATE POLICY "Signed-in users append activity" ON public.activity
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

-- 7. updated_at triggers (numina trigger may already exist; recreate idempotently)
DROP TRIGGER IF EXISTS set_numina_updated_at ON public.numina;
CREATE TRIGGER set_numina_updated_at BEFORE UPDATE ON public.numina
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS set_strategies_updated_at ON public.strategies;
CREATE TRIGGER set_strategies_updated_at BEFORE UPDATE ON public.strategies
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();
DROP TRIGGER IF EXISTS set_profiles_updated_at ON public.profiles;
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();