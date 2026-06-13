import { o as __toESM } from "../_runtime.mjs";
import { _ as useSearch, g as useNavigate, h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { i as stringType, r as objectType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { t as supabase } from "./client-BZiZuiJD.mjs";
import { a as useAuth, n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/auth-Bc26qufY.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var credsSchema = objectType({
	email: stringType().trim().email("Speak a real glyph (email).").max(255),
	password: stringType().min(8, "At least 8 runes.").max(72)
});
function AuthPage() {
	const { user, loading } = useAuth();
	const { redirect } = useSearch({ from: "/auth" });
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("signin");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!loading && user) navigate({
			to: redirect && redirect.startsWith("/") ? redirect : "/sanctum",
			replace: true
		});
	}, [
		loading,
		user,
		redirect,
		navigate
	]);
	async function withEmail(e) {
		e.preventDefault();
		const parsed = credsSchema.safeParse({
			email,
			password
		});
		if (!parsed.success) {
			toast.error(parsed.error.issues[0]?.message ?? "Invalid input");
			return;
		}
		setBusy("email");
		try {
			if (mode === "signup") {
				const { error } = await supabase.auth.signUp({
					email: parsed.data.email,
					password: parsed.data.password,
					options: { emailRedirectTo: window.location.origin + "/sanctum" }
				});
				if (error) throw error;
				toast.success("Sigil etched", { description: "Check your email to confirm, then sign in." });
				setMode("signin");
			} else {
				const { error } = await supabase.auth.signInWithPassword({
					email: parsed.data.email,
					password: parsed.data.password
				});
				if (error) throw error;
				toast.success("The gate opens");
			}
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("The rite was refused", { description: msg });
		} finally {
			setBusy(null);
		}
	}
	async function withGoogle() {
		setBusy("google");
		try {
			const result = await supabase.auth.signInWithOAuth({
				provider: "google",
				options: { redirectTo: window.location.origin + "/sanctum" }
			});
			if (result.error) throw result.error instanceof Error ? result.error : new Error(String(result.error));
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("Google refused the rite", { description: msg });
			setBusy(null);
		}
	}
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
					className: "mx-auto grid min-h-[80vh] max-w-5xl items-center gap-12 px-6 py-16 lg:grid-cols-[1fr_400px]",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "hidden lg:block text-center",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mx-auto animate-pulse-glow w-fit",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
									seed: email || "altar-gate",
									size: 280
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mt-8 font-display text-[11px] uppercase tracking-[0.4em] text-gold",
								children: "The Gate"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-3 font-display text-2xl text-hi",
								children: "Cross the threshold."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mx-auto mt-3 max-w-sm text-sm text-mid",
								children: "Your sigil is the key. Once you cross, the Sanctum will remember you between rites."
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ritual-border rounded-3xl p-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold",
								children: mode === "signin" ? "Return to the altar" : "Etch a new sigil"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-2 text-2xl text-hi",
								children: mode === "signin" ? "Sign in" : "Create account"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								onClick: withGoogle,
								disabled: busy !== null,
								className: "mt-6 flex w-full items-center justify-center gap-3 rounded-xl border border-line bg-surface/60 px-4 py-3 text-sm text-hi hover:border-aether/60 disabled:opacity-50",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
									width: "18",
									height: "18",
									viewBox: "0 0 18 18",
									"aria-hidden": true,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#4285F4",
											d: "M17.64 9.2c0-.64-.06-1.25-.17-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.61z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#34A853",
											d: "M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.27c-.8.54-1.84.87-3.04.87-2.34 0-4.32-1.58-5.03-3.7H.96v2.33A9 9 0 0 0 9 18z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#FBBC05",
											d: "M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.96A9 9 0 0 0 0 9c0 1.45.35 2.83.96 4.05l3.01-2.33z"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
											fill: "#EA4335",
											d: "M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58A9 9 0 0 0 9 0 9 9 0 0 0 .96 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58z"
										})
									]
								}), busy === "google" ? "Opening Google…" : "Continue with Google"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "my-6 flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "font-mono text-[10px] uppercase tracking-widest text-low",
										children: "or"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-px flex-1 bg-line" })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								onSubmit: withEmail,
								className: "space-y-4",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-widest text-low",
										children: "Email"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "email",
										value: email,
										onChange: (e) => setEmail(e.target.value),
										required: true,
										autoComplete: "email",
										className: "mt-2 w-full rounded-xl border border-line bg-void/40 px-4 py-3 font-mono text-sm text-hi outline-none focus:border-aether/60"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
										className: "font-mono text-[10px] uppercase tracking-widest text-low",
										children: "Password"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										type: "password",
										value: password,
										onChange: (e) => setPassword(e.target.value),
										required: true,
										minLength: 8,
										autoComplete: mode === "signup" ? "new-password" : "current-password",
										className: "mt-2 w-full rounded-xl border border-line bg-void/40 px-4 py-3 font-mono text-sm text-hi outline-none focus:border-aether/60"
									})] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: busy !== null,
										className: "w-full rounded-full border border-gold/60 bg-gradient-to-b from-gold/20 to-gold/5 px-6 py-3 text-xs uppercase tracking-widest text-gold hover:shadow-[var(--glow-gold)] disabled:opacity-50",
										children: busy === "email" ? "Invoking…" : mode === "signin" ? "Enter the Sanctum" : "Etch the sigil"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								onClick: () => setMode((m) => m === "signin" ? "signup" : "signin"),
								className: "mt-6 w-full text-center text-xs text-mid hover:text-hi",
								children: mode === "signin" ? "No sigil yet? Etch one →" : "Already inscribed? Sign in →"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 text-center text-[11px] text-low",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/",
									className: "hover:text-mid",
									children: "← Return to the threshold"
								})
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
//#endregion
export { AuthPage as component };
