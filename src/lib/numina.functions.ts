import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const createSchema = z.object({
  name: z.string().trim().min(2).max(32),
  purpose: z.enum(["trading", "monitor", "task"]),
  strategy: z.string().trim().min(10).max(2000),
  budget: z.number().min(0.01).max(1000),
  maxPerTx: z.number().min(0.01).max(1000),
  riskLevel: z.enum(["low", "medium", "high"]),
  tithe: z.number().min(1).max(10000),
  ownerWallet: z.string().nullable().optional(),
});

export const createNumen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => createSchema.parse(input))
  .handler(async ({ data, context }) => {
    const sigilSeed = `${context.userId.slice(0, 8)}-${Date.now().toString(36)}-${data.name}`;
    const { data: row, error } = await context.supabase
      .from("numina")
      .insert({
        name: data.name,
        purpose: data.purpose,
        sigil_seed: sigilSeed,
        owner_id: context.userId,
        owner_wallet: data.ownerWallet ?? null,
        status: "awake",
        config: {
          strategy: data.strategy,
          budget: data.budget,
          maxPerTx: data.maxPerTx,
          riskLevel: data.riskLevel,
          tithe: data.tithe,
        },
      })
      .select("id, name, status, purpose, sigil_seed, created_at")
      .single();
    if (error) throw new Error(error.message);
    return row;
  });

export const listMyNumina = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("numina")
      .select("id, name, status, purpose, sigil_seed, config, created_at")
      .order("created_at", { ascending: false });
    if (error) throw new Error(error.message);
    return data ?? [];
  });

export const deleteNumen = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data, context }) => {
    const { error } = await context.supabase.from("numina").delete().eq("id", data.id);
    if (error) throw new Error(error.message);
    return { ok: true };
  });