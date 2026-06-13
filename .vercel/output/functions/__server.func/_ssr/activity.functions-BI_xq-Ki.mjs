import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.mjs";
import { i as stringType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D5iHXU59.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/activity.functions-BI_xq-Ki.js
var insertSchema = objectType({
	numen: stringType().min(1).max(120),
	kind: enumType([
		"decision",
		"trade",
		"alert",
		"error"
	]),
	text: stringType().min(1).max(500)
});
/**
* Authenticated insert — RLS requires user_id = auth.uid(). Activity rows are
* publicly readable, but only signed-in users can append (and only as themselves).
*/
var insertActivity = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => insertSchema.parse(input)).handler(createSsrRpc("ae5fe293ca2757450d6f483f34fc31fdd133ec51f71a9c91012074b03f263a25"));
/** Clear only the current user's activity rows. */
var clearActivity = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("382f128bb71a3f2ea8af1802c1d7801d1451f2ea78e5800758c30af92d62bdc6"));
//#endregion
export { insertActivity as n, clearActivity as t };
