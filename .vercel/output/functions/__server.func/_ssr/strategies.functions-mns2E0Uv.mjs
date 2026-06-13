import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as createServerRpc } from "./createServerRpc-WJgk8O8C.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/strategies.functions-mns2E0Uv.js
/** Public read — anyone can browse the Pantheon. Uses admin for SSR-safe access. */
var listPublicStrategies_createServerFn_handler = createServerRpc({
	id: "e80589775f6534bfd228eac5eb04860fdeb7d5d2a975c1ac70706f0ba8bf2a55",
	name: "listPublicStrategies",
	filename: "src/lib/strategies.functions.ts"
}, (opts) => listPublicStrategies.__executeServer(opts));
var listPublicStrategies = createServerFn({ method: "GET" }).handler(listPublicStrategies_createServerFn_handler, async () => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data, error } = await supabaseAdmin.from("strategies").select("id, title, description, risk_level, roi, clones, author_wallet, created_at").eq("is_public", true).order("clones", { ascending: false }).limit(60);
	if (error) throw new Error(error.message);
	return data ?? [];
});
var cloneStrategy_createServerFn_handler = createServerRpc({
	id: "e81b6471ea11676f2a170a307d06869c19a5ac8eb8a177d9e9a8fa4082787aac",
	name: "cloneStrategy",
	filename: "src/lib/strategies.functions.ts"
}, (opts) => cloneStrategy.__executeServer(opts));
var cloneStrategy = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(cloneStrategy_createServerFn_handler, async ({ data }) => {
	const { supabaseAdmin } = await import("./client.server-D1oHePJa.mjs");
	const { data: current, error: readErr } = await supabaseAdmin.from("strategies").select("clones").eq("id", data.id).eq("is_public", true).maybeSingle();
	if (readErr) throw new Error(readErr.message);
	if (!current) throw new Error("Strategy not found");
	const { error } = await supabaseAdmin.from("strategies").update({ clones: (current.clones ?? 0) + 1 }).eq("id", data.id);
	if (error) throw new Error(error.message);
	return {
		ok: true,
		clones: (current.clones ?? 0) + 1
	};
});
//#endregion
export { cloneStrategy_createServerFn_handler, listPublicStrategies_createServerFn_handler };
