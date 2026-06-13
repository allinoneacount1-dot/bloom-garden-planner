import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Stub-BG3w6kHP.js
var import_jsx_runtime = require_jsx_runtime();
function StubPage({ eyebrow, title, body, seed }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative isolate overflow-hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "starfield absolute inset-0 -z-10 opacity-50",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto grid min-h-[70vh] max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-display text-[11px] uppercase tracking-[0.4em] text-gold",
							children: eyebrow
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-4 text-5xl text-hi md:text-6xl",
							children: title
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-6 max-w-lg text-base leading-relaxed text-mid",
							children: body
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-10 inline-flex items-center gap-3 rounded-full border border-aether/40 bg-aether/5 px-4 py-2 text-[11px] uppercase tracking-[0.25em] text-aether",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-aether" }), "Awaiting consecration · v0.1 devnet"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/",
								className: "text-xs uppercase tracking-[0.25em] text-mid hover:text-hi",
								children: "← Return to the Gate"
							})
						})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative flex items-center justify-center opacity-80",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-pulse-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
								seed,
								size: 420
							})
						})
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { StubPage as t };
