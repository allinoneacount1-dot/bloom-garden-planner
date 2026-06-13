import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/numina.functions-Wpu8hBZ1.js
var createSchema = objectType({
	name: stringType().trim().min(2).max(32),
	purpose: enumType([
		"trading",
		"monitor",
		"task"
	]),
	strategy: stringType().trim().min(10).max(2e3),
	budget: numberType().min(.01).max(1e3),
	maxPerTx: numberType().min(.01).max(1e3),
	riskLevel: enumType([
		"low",
		"medium",
		"high"
	]),
	tithe: numberType().min(1).max(1e4),
	ownerWallet: stringType().nullable().optional()
});
var createNumen_createServerFn_handler = createServerRpc({
	id: "ee850c9359ec8ac09d1ea5bd10f8207d9bede640392c8a043f987ba8209fbeed",
	name: "createNumen",
	filename: "src/lib/numina.functions.ts"
}, (opts) => createNumen.__executeServer(opts));
var createNumen = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => createSchema.parse(input)).handler(createNumen_createServerFn_handler, async ({ data, context }) => {
	const sigilSeed = `${context.userId.slice(0, 8)}-${Date.now().toString(36)}-${data.name}`;
	const { data: row, error } = await context.supabase.from("numina").insert({
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
			tithe: data.tithe
		}
	}).select("id, name, status, purpose, sigil_seed, created_at").single();
	if (error) throw new Error(error.message);
	return row;
});
var listMyNumina_createServerFn_handler = createServerRpc({
	id: "b527a23127c5dd23eb0de07c04f6f09d0e8e87028839d14a348e20b27f56c302",
	name: "listMyNumina",
	filename: "src/lib/numina.functions.ts"
}, (opts) => listMyNumina.__executeServer(opts));
var listMyNumina = createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(listMyNumina_createServerFn_handler, async ({ context }) => {
	const { data, error } = await context.supabase.from("numina").select("id, name, status, purpose, sigil_seed, config, created_at").order("created_at", { ascending: false });
	if (error) throw new Error(error.message);
	return data ?? [];
});
var deleteNumen_createServerFn_handler = createServerRpc({
	id: "b2864858a666c3eabfcd94c5d86cff72edcf349712e664bc85c07b360b8600cc",
	name: "deleteNumen",
	filename: "src/lib/numina.functions.ts"
}, (opts) => deleteNumen.__executeServer(opts));
var deleteNumen = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(deleteNumen_createServerFn_handler, async ({ data, context }) => {
	const { error } = await context.supabase.from("numina").delete().eq("id", data.id);
	if (error) throw new Error(error.message);
	return { ok: true };
});
//#endregion
export { createNumen_createServerFn_handler, deleteNumen_createServerFn_handler, listMyNumina_createServerFn_handler };
