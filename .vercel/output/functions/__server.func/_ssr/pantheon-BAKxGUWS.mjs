import { o as __toESM } from "../_runtime.mjs";
import { O as isRedirect, h as Link, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useAuth, n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D5iHXU59.mjs";
import { i as useQueryClient, n as useQuery, t as useMutation } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/pantheon-BAKxGUWS.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function useServerFn(serverFn) {
	const router = useRouter();
	return import_react.useCallback(async (...args) => {
		try {
			const res = await serverFn(...args);
			if (isRedirect(res)) throw res;
			return res;
		} catch (err) {
			if (isRedirect(err)) {
				err.options._fromLocation = router.stores.location.get();
				return router.navigate(router.resolveRedirect(err).options);
			}
			throw err;
		}
	}, [router, serverFn]);
}
/** Public read — anyone can browse the Pantheon. Uses admin for SSR-safe access. */
var listPublicStrategies = createServerFn({ method: "GET" }).handler(createSsrRpc("e80589775f6534bfd228eac5eb04860fdeb7d5d2a975c1ac70706f0ba8bf2a55"));
var cloneStrategy = createServerFn({ method: "POST" }).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("e81b6471ea11676f2a170a307d06869c19a5ac8eb8a177d9e9a8fa4082787aac"));
function Pantheon() {
	const list = useServerFn(listPublicStrategies);
	const clone = useServerFn(cloneStrategy);
	const qc = useQueryClient();
	const { user } = useAuth();
	const [risk, setRisk] = (0, import_react.useState)("all");
	const { data, isLoading, error, refetch } = useQuery({
		queryKey: ["strategies", "public"],
		queryFn: () => list()
	});
	const cloneMut = useMutation({
		mutationFn: (id) => clone({ data: { id } }),
		onSuccess: () => {
			toast.success("Strategy cloned to your altar");
			qc.invalidateQueries({ queryKey: ["strategies", "public"] });
		},
		onError: (err) => {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("Could not clone", { description: msg });
		}
	});
	const filtered = (data ?? []).filter((s) => risk === "all" || s.risk_level === risk);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative isolate",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "starfield absolute inset-0 -z-10 opacity-40",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto max-w-7xl px-6 pt-16 pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-10",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-[11px] uppercase tracking-[0.4em] text-gold",
									children: "The Pantheon"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
									className: "font-display mt-2 text-3xl text-hi md:text-4xl",
									children: "Strategies of the elder Numina."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 max-w-2xl text-sm text-mid",
									children: "Clone a proven Numen with a single rite, or contribute your own to be judged by the Choir."
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-6 flex flex-wrap items-center gap-2",
							children: [[
								"all",
								"low",
								"medium",
								"high"
							].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setRisk(r),
								className: `rounded-full border px-4 py-1.5 text-[10px] uppercase tracking-widest transition-all ${risk === r ? "border-aether/60 bg-aether/10 text-hi" : "border-line bg-surface/40 text-mid hover:text-hi"}`,
								children: r === "all" ? "All risks" : r
							}, r)), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ml-auto font-mono text-[10px] uppercase tracking-widest text-low",
								children: isLoading ? "Reading the ledger…" : `${filtered.length} strateg${filtered.length === 1 ? "y" : "ies"}`
							})]
						}),
						error ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ritual-border rounded-3xl p-8 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-[10px] uppercase tracking-[0.4em] text-danger",
									children: "The Pantheon is silent"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-mid",
									children: error instanceof Error ? error.message : "Failed to load"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => refetch(),
									className: "mt-4 rounded-full border border-aether/60 bg-aether/10 px-5 py-2 text-xs uppercase tracking-widest text-aether hover:bg-aether/20",
									children: "Try again"
								})
							]
						}) : isLoading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: Array.from({ length: 6 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-48 animate-pulse rounded-3xl border border-line bg-surface/30" }, i))
						}) : filtered.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ritual-border rounded-3xl p-12 text-center",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mx-auto w-fit opacity-40",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
										seed: "empty-pantheon",
										size: 120
									})
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-4 font-display text-sm text-mid",
									children: "No strategies match this filter."
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-1 text-xs text-low",
									children: "Be the first to inscribe one."
								})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "grid gap-4 md:grid-cols-2 lg:grid-cols-3",
							children: filtered.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "ritual-border group flex flex-col rounded-3xl p-6",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "shrink-0",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
												seed: s.id,
												size: 56
											})
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
												className: "font-display truncate text-base text-hi",
												children: s.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-low",
												children: [
													"risk · ",
													s.risk_level,
													" · ",
													s.clones,
													" clones"
												]
											})]
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-4 line-clamp-3 text-xs text-mid",
										children: s.description || "No description."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-4 flex items-center justify-between border-t border-line/60 pt-4",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-mono text-[10px] uppercase tracking-widest text-low",
											children: "ROI"
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: `font-display text-sm ${(s.roi ?? 0) >= 0 ? "text-plasma" : "text-danger"}`,
											children: s.roi != null ? `${s.roi >= 0 ? "+" : ""}${s.roi}%` : "—"
										})] }), user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => cloneMut.mutate(s.id),
											disabled: cloneMut.isPending,
											className: "rounded-full border border-gold/60 bg-gold/10 px-4 py-2 text-[10px] uppercase tracking-widest text-gold hover:shadow-[var(--glow-gold)] disabled:opacity-40",
											children: cloneMut.isPending && cloneMut.variables === s.id ? "Cloning…" : "Clone"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
											to: "/auth",
											className: "rounded-full border border-aether/60 bg-aether/10 px-4 py-2 text-[10px] uppercase tracking-widest text-aether hover:bg-aether/20",
											children: "Sign in to clone"
										})]
									})
								]
							}, s.id))
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { Pantheon as component };
