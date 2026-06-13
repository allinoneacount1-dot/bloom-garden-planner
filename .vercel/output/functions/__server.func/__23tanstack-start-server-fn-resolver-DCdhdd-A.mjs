//#region node_modules/.nitro/vite/services/ssr/assets/__23tanstack-start-server-fn-resolver-DCdhdd-A.js
var manifest = {
	"382f128bb71a3f2ea8af1802c1d7801d1451f2ea78e5800758c30af92d62bdc6": {
		functionName: "clearActivity_createServerFn_handler",
		importer: () => import("./_ssr/activity.functions-B1_8CCVf.mjs")
	},
	"ae5fe293ca2757450d6f483f34fc31fdd133ec51f71a9c91012074b03f263a25": {
		functionName: "insertActivity_createServerFn_handler",
		importer: () => import("./_ssr/activity.functions-B1_8CCVf.mjs")
	},
	"b2864858a666c3eabfcd94c5d86cff72edcf349712e664bc85c07b360b8600cc": {
		functionName: "deleteNumen_createServerFn_handler",
		importer: () => import("./_ssr/numina.functions-Wpu8hBZ1.mjs")
	},
	"b527a23127c5dd23eb0de07c04f6f09d0e8e87028839d14a348e20b27f56c302": {
		functionName: "listMyNumina_createServerFn_handler",
		importer: () => import("./_ssr/numina.functions-Wpu8hBZ1.mjs")
	},
	"e80589775f6534bfd228eac5eb04860fdeb7d5d2a975c1ac70706f0ba8bf2a55": {
		functionName: "listPublicStrategies_createServerFn_handler",
		importer: () => import("./_ssr/strategies.functions-mns2E0Uv.mjs")
	},
	"e81b6471ea11676f2a170a307d06869c19a5ac8eb8a177d9e9a8fa4082787aac": {
		functionName: "cloneStrategy_createServerFn_handler",
		importer: () => import("./_ssr/strategies.functions-mns2E0Uv.mjs")
	},
	"ee850c9359ec8ac09d1ea5bd10f8207d9bede640392c8a043f987ba8209fbeed": {
		functionName: "createNumen_createServerFn_handler",
		importer: () => import("./_ssr/numina.functions-Wpu8hBZ1.mjs")
	}
};
async function getServerFnById(id, access) {
	const serverFnInfo = manifest[id];
	if (!serverFnInfo) throw new Error("Server function info not found for " + id);
	const fnModule = serverFnInfo.module ?? await serverFnInfo.importer();
	if (!fnModule) throw new Error("Server function module not resolved for " + id);
	const action = fnModule[serverFnInfo.functionName];
	if (!action) throw new Error("Server function module export not resolved for serverFn ID: " + id);
	return action;
}
//#endregion
export { getServerFnById as t };
