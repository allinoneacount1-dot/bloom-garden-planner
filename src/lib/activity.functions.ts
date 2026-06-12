import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const insertSchema = z.object({
  numen: z.string().min(1).max(120),
  kind: z.enum(["decision", "trade", "alert", "error"]),
  text: z.string().min(1).max(500),
});

/**
 * Public insert — wallet-as-identity model (no auth yet). Validates payload.
 * Realtime subscribers receive the row instantly via the supabase_realtime publication.
 */
export const insertActivity = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => insertSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("activity")
      .insert(data)
      .select("id, numen, kind, text, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const clearActivity = createServerFn({ method: "POST" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { error } = await supabaseAdmin.from("activity").delete().gt("id", 0);
  if (error) throw new Error(error.message);
  return { ok: true };
});