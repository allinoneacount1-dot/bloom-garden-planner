import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

/** Public read — anyone can browse the Pantheon. Uses admin for SSR-safe access. */
export const listPublicStrategies = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("strategies")
    .select("id, title, description, risk_level, roi, clones, author_wallet, created_at")
    .eq("is_public", true)
    .order("clones", { ascending: false })
    .limit(60);
  if (error) throw new Error(error.message);
  return data ?? [];
});

export const cloneStrategy = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    // Atomically bump the clones counter — safe public action (no PII written).
    const { data: current, error: readErr } = await supabaseAdmin
      .from("strategies")
      .select("clones")
      .eq("id", data.id)
      .eq("is_public", true)
      .maybeSingle();
    if (readErr) throw new Error(readErr.message);
    if (!current) throw new Error("Strategy not found");
    const { error } = await supabaseAdmin
      .from("strategies")
      .update({ clones: (current.clones ?? 0) + 1 })
      .eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true, clones: (current.clones ?? 0) + 1 };
  });