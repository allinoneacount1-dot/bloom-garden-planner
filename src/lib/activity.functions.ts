import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const insertSchema = z.object({
  numen: z.string().min(1).max(120),
  kind: z.enum(["decision", "trade", "alert", "error"]),
  text: z.string().min(1).max(500),
});

/**
 * Authenticated insert — RLS requires user_id = auth.uid(). Activity rows are
 * publicly readable, but only signed-in users can append (and only as themselves).
 */
export const insertActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => insertSchema.parse(input))
  .handler(async ({ data, context }) => {
    const { data: row, error } = await context.supabase
      .from("activity")
      .insert({ ...data, user_id: context.userId })
      .select("id, numen, kind, text, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

/** Clear only the current user's activity rows. */
export const clearActivity = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { error } = await context.supabase
      .from("activity")
      .delete()
      .eq("user_id", context.userId);
    if (error) throw new Error(error.message);
    return { ok: true };
  });