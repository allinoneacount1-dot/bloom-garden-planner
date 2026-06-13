import { o as __toESM } from "../_runtime.mjs";
import { c as HeadContent, d as Outlet, f as lazyRouteComponent, h as Link, j as redirect, m as createRootRouteWithContext, p as createFileRoute, s as Scripts, u as createRouter, v as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
import { t as NuminaWalletProvider } from "./WalletProvider-B0MXIGoG.mjs";
import { t as supabase } from "./client-BZiZuiJD.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
import { r as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-Dgl_c6qX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-Dp05dqtF.css";
var Toaster$1 = ({ ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
		className: "toaster group",
		toastOptions: { classNames: {
			toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
			description: "group-[.toast]:text-muted-foreground",
			actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
			cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
		} },
		...props
	});
};
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		console.error("[Error Boundary]", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$9 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1"
			},
			{ title: "NÚMINA — Summon intelligence. Bind it to the chain." },
			{
				name: "description",
				content: "NÚMINA is a protocol for invoking autonomous on-chain AI agents on Solana — bound to your wallet, acting within ritual guardrails."
			},
			{
				name: "author",
				content: "NÚMINA"
			},
			{
				property: "og:title",
				content: "NÚMINA — Summon intelligence. Bind it to the chain."
			},
			{
				property: "og:description",
				content: "Invoke autonomous on-chain AI agents on Solana. Non-custodial, ritualistic, sovereign."
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary"
			},
			{
				name: "twitter:site",
				content: "@numina"
			}
		],
		links: [
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
			},
			{
				rel: "stylesheet",
				href: styles_default
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$9.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NuminaWalletProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster$1, {
			theme: "dark",
			position: "bottom-right"
		})] })
	});
}
var $$splitComponentImporter$8 = () => import("./pantheon-BAKxGUWS.mjs");
var Route$8 = createFileRoute("/pantheon")({
	head: () => ({ meta: [{ title: "The Pantheon — NÚMINA" }, {
		name: "description",
		content: "Marketplace of strategies. Clone the Numina that have proven themselves before the Choir."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./lore-783Cd6zG.mjs");
var Route$7 = createFileRoute("/lore")({
	head: () => ({ meta: [{ title: "The Mythos — NÚMINA" }, {
		name: "description",
		content: "The cosmology of NÚMINA: the Silence, the First Light, the Numina, and the rites that bind them."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./choir-By4dAOAY.mjs");
var Route$6 = createFileRoute("/choir")({
	head: () => ({ meta: [{ title: "The Choir — NÚMINA" }, {
		name: "description",
		content: "The collective voice. Leaderboard and aggregate signal of every public Numen."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./auth-Bc26qufY.mjs");
var searchSchema = objectType({ redirect: stringType().optional() });
var Route$5 = createFileRoute("/auth")({
	validateSearch: searchSchema,
	head: () => ({ meta: [{ title: "Enter the Sanctum — NÚMINA" }, {
		name: "description",
		content: "Sign in or summon a new sigil to invoke your Numen."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./aether-Cc-ghkdA.mjs");
var Route$4 = createFileRoute("/aether")({
	head: () => ({ meta: [{ title: "The Aether — NÚMINA" }, {
		name: "description",
		content: "Treasury, staking, and the energy that feeds every awakened Numen."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./route-Di7iQBCH.mjs");
var Route$3 = createFileRoute("/_authenticated")({
	ssr: false,
	beforeLoad: async ({ location }) => {
		const { data, error } = await supabase.auth.getUser();
		if (error || !data.user) throw redirect({
			to: "/auth",
			search: { redirect: location.href }
		});
		return { user: data.user };
	},
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./routes-2Hyq2Z8T.mjs");
var Route$2 = createFileRoute("/")({
	head: () => ({ meta: [
		{ title: "NÚMINA — Summon intelligence. Bind it to the chain." },
		{
			name: "description",
			content: "Invoke autonomous on-chain AI agents on Solana. Non-custodial. Ritualistic. Sovereign."
		},
		{
			property: "og:title",
			content: "NÚMINA — The Gate"
		},
		{
			property: "og:description",
			content: "Summon intelligence. Bind it to the chain."
		}
	] }),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./sanctum-DwenmOXF.mjs");
var Route$1 = createFileRoute("/_authenticated/sanctum")({
	head: () => ({ meta: [{ title: "The Sanctum — NÚMINA" }, {
		name: "description",
		content: "Your altar. Every Numen bound to your wallet, their sigils, signals, and silences."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./sanctum.invoke-CIogMCXk.mjs");
var Route = createFileRoute("/_authenticated/sanctum/invoke")({
	head: () => ({ meta: [{ title: "The Rite — NÚMINA" }, {
		name: "description",
		content: "Six steps to summon a Numen and bind it to your wallet."
	}] }),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var PantheonRoute = Route$8.update({
	id: "/pantheon",
	path: "/pantheon",
	getParentRoute: () => Route$9
});
var LoreRoute = Route$7.update({
	id: "/lore",
	path: "/lore",
	getParentRoute: () => Route$9
});
var ChoirRoute = Route$6.update({
	id: "/choir",
	path: "/choir",
	getParentRoute: () => Route$9
});
var AuthRoute = Route$5.update({
	id: "/auth",
	path: "/auth",
	getParentRoute: () => Route$9
});
var AetherRoute = Route$4.update({
	id: "/aether",
	path: "/aether",
	getParentRoute: () => Route$9
});
var AuthenticatedRouteRoute = Route$3.update({
	id: "/_authenticated",
	getParentRoute: () => Route$9
});
var IndexRoute = Route$2.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$9
});
var AuthenticatedSanctumRoute = Route$1.update({
	id: "/sanctum",
	path: "/sanctum",
	getParentRoute: () => AuthenticatedRouteRoute
});
var AuthenticatedSanctumRouteChildren = { AuthenticatedSanctumInvokeRoute: Route.update({
	id: "/invoke",
	path: "/invoke",
	getParentRoute: () => AuthenticatedSanctumRoute
}) };
var AuthenticatedRouteRouteChildren = { AuthenticatedSanctumRoute: AuthenticatedSanctumRoute._addFileChildren(AuthenticatedSanctumRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AuthenticatedRouteRoute: AuthenticatedRouteRoute._addFileChildren(AuthenticatedRouteRouteChildren),
	AetherRoute,
	AuthRoute,
	ChoirRoute,
	LoreRoute,
	PantheonRoute
};
var routeTree = Route$9._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	return createRouter({
		routeTree,
		context: { queryClient: new QueryClient() },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
