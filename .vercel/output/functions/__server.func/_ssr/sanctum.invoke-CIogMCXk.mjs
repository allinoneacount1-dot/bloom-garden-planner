import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { l as createServerFn } from "./esm-Dova13aH.mjs";
import { t as requireSupabaseAuth } from "./auth-middleware-QP6BYy5L.mjs";
import { i as stringType, n as numberType, r as objectType, t as enumType } from "../_libs/zod.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { r as useNuminaWallet } from "./WalletProvider-B0MXIGoG.mjs";
import { n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
import { t as createSsrRpc } from "./createSsrRpc-D5iHXU59.mjs";
import { n as insertActivity } from "./activity.functions-BI_xq-Ki.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sanctum.invoke-CIogMCXk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
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
var createNumen = createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => createSchema.parse(input)).handler(createSsrRpc("ee850c9359ec8ac09d1ea5bd10f8207d9bede640392c8a043f987ba8209fbeed"));
createServerFn({ method: "GET" }).middleware([requireSupabaseAuth]).handler(createSsrRpc("b527a23127c5dd23eb0de07c04f6f09d0e8e87028839d14a348e20b27f56c302"));
createServerFn({ method: "POST" }).middleware([requireSupabaseAuth]).inputValidator((input) => objectType({ id: stringType().uuid() }).parse(input)).handler(createSsrRpc("b2864858a666c3eabfcd94c5d86cff72edcf349712e664bc85c07b360b8600cc"));
var STEPS = [
	{
		n: "01",
		t: "Naming",
		lore: "Speak the true name. From its seed the sigil is forged."
	},
	{
		n: "02",
		t: "Purpose",
		lore: "Why does the Numen wake? Trader, watcher, or hand of tasks."
	},
	{
		n: "03",
		t: "Strategy",
		lore: "Inscribe the rules by which it will read the signs."
	},
	{
		n: "04",
		t: "Bounds",
		lore: "Budget and ceiling. The chain enforces what the rite declares."
	},
	{
		n: "05",
		t: "Tithe",
		lore: "Offer $LMN. Energy is what permits action."
	},
	{
		n: "06",
		t: "Seal",
		lore: "Sign once. The PDA is forged. The Sigil is minted."
	}
];
var DRAFT_KEY = "numina:rite-draft:v1";
var DEFAULT_FORM = {
	name: "",
	purpose: "",
	strategy: "",
	budget: 1,
	maxPerTx: .2,
	riskLevel: "low",
	tithe: 10
};
var STEP_GUIDANCE = {
	0: "A Numen without a true name cannot be sealed. Speak between 2 and 32 glyphs.",
	1: "Every awakening serves a purpose. Choose: trader, watcher, or hand of tasks.",
	2: "The chain reads only what is inscribed. Write at least a single rule.",
	3: "The bounds must hold. No single act may exceed the budget you have offered.",
	4: "Without tithe, the vessel cannot draw breath. Offer at least 1 $LMN.",
	5: "The seal will not hold until every prior rite is complete."
};
function Rite() {
	const { connected, connect, publicKey } = useNuminaWallet();
	const [step, setStep] = (0, import_react.useState)(0);
	const [sealed, setSealed] = (0, import_react.useState)(false);
	const [form, setForm] = (0, import_react.useState)(DEFAULT_FORM);
	const [hydrated, setHydrated] = (0, import_react.useState)(false);
	const [sealing, setSealing] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = localStorage.getItem(DRAFT_KEY);
			if (raw) {
				const saved = JSON.parse(raw);
				if (saved.form) setForm({
					...DEFAULT_FORM,
					...saved.form
				});
				if (typeof saved.step === "number") setStep(Math.min(5, Math.max(0, saved.step)));
			}
		} catch {}
		setHydrated(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!hydrated) return;
		try {
			localStorage.setItem(DRAFT_KEY, JSON.stringify({
				form,
				step
			}));
		} catch {}
	}, [
		form,
		step,
		hydrated
	]);
	const errors = (0, import_react.useMemo)(() => validate(form, step), [form, step]);
	const canAdvance = errors.length === 0;
	function update(k, v) {
		setForm((f) => ({
			...f,
			[k]: v
		}));
	}
	async function seal() {
		if (!canAdvance || !connected || sealing) return;
		setSealing(true);
		try {
			await createNumen({ data: {
				name: form.name,
				purpose: form.purpose,
				strategy: form.strategy,
				budget: form.budget,
				maxPerTx: form.maxPerTx,
				riskLevel: form.riskLevel,
				tithe: form.tithe,
				ownerWallet: publicKey
			} });
			await insertActivity({ data: {
				numen: form.name,
				kind: "decision",
				text: `Rite sealed · ${form.purpose} · ${form.budget} SOL · ${form.tithe} $LMN`
			} });
			await insertActivity({ data: {
				numen: form.name,
				kind: "alert",
				text: "Numen awoken — PDA forged, sigil minted"
			} });
			try {
				localStorage.removeItem(DRAFT_KEY);
			} catch {}
			setSealed(true);
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("The seal would not take", { description: msg });
		} finally {
			setSealing(false);
		}
	}
	if (sealed) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SealedScene, { name: form.name });
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
					className: "mx-auto max-w-6xl px-6 pt-16 pb-20",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-8 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-[11px] uppercase tracking-[0.4em] text-gold",
								children: "The Rite"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								className: "font-display mt-2 text-3xl text-hi md:text-4xl",
								children: "Summon a Numen"
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sanctum",
								className: "text-xs uppercase tracking-[0.25em] text-mid hover:text-hi",
								children: "← Return to the Sanctum"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
							className: "mb-10 grid grid-cols-6 gap-2",
							children: STEPS.map((s, i) => {
								const active = i === step;
								const done = i < step;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex flex-col items-start gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: `h-1 w-full rounded-full ${done ? "bg-gold" : active ? "bg-aether" : "bg-line"}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `font-mono text-[10px] uppercase tracking-widest ${active ? "text-hi" : done ? "text-gold" : "text-low"}`,
										children: [
											s.n,
											" · ",
											s.t
										]
									})]
								}, s.n);
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "grid gap-10 lg:grid-cols-[1fr_360px]",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ritual-border rounded-3xl p-8",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold",
										children: ["Step ", STEPS[step].n]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "font-display mt-2 text-2xl text-hi",
										children: STEPS[step].t
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-2 max-w-md text-sm italic text-mid",
										children: STEPS[step].lore
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8",
										children: [
											step === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "True name",
												hint: "Letters, numbers, spaces. 2–32 characters.",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													value: form.name,
													onChange: (e) => update("name", e.target.value),
													placeholder: "Ember of Pyth",
													className: "w-full rounded-xl border border-line bg-void/40 px-4 py-3 font-mono text-sm text-hi outline-none focus:border-aether/60"
												})
											}),
											step === 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Purpose",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
													className: "grid gap-3 sm:grid-cols-3",
													children: [
														"trading",
														"monitor",
														"task"
													].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
														onClick: () => update("purpose", p),
														className: `rounded-2xl border p-4 text-left transition-all ${form.purpose === p ? "border-gold/60 bg-gold/10 shadow-[var(--glow-gold)]" : "border-line bg-surface/40 hover:border-aether/50"}`,
														children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "font-display text-sm capitalize text-hi",
															children: p
														}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "mt-1 text-xs text-mid",
															children: p === "trading" ? "Reads price, takes positions." : p === "monitor" ? "Watches signal, raises alerts." : "Runs scheduled tasks."
														})]
													}, p))
												})
											}),
											step === 2 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
												label: "Strategy",
												hint: "Plain language for now. Templates will arrive from the Pantheon.",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
													rows: 5,
													value: form.strategy,
													onChange: (e) => update("strategy", e.target.value),
													placeholder: "When SOL/USDC crosses 5m MA upward and oracle confidence > 0.6, buy 0.5 SOL. Sell on −1% drawdown.",
													className: "w-full rounded-xl border border-line bg-void/40 px-4 py-3 font-mono text-xs text-hi outline-none focus:border-aether/60"
												})
											}),
											step === 3 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-6",
												children: [
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: `Budget · ${form.budget} SOL`,
														hint: "Total scoped to the program PDA. Enforced on-chain.",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "range",
															min: .1,
															max: 20,
															step: .1,
															value: form.budget,
															onChange: (e) => update("budget", Number(e.target.value)),
															className: "w-full accent-aether"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: `Max per transaction · ${form.maxPerTx} SOL`,
														hint: "Per-action ceiling. Cannot exceed budget.",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
															type: "range",
															min: .05,
															max: form.budget,
															step: .05,
															value: form.maxPerTx,
															onChange: (e) => update("maxPerTx", Number(e.target.value)),
															className: "w-full accent-aether"
														})
													}),
													/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
														label: "Risk",
														children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
															className: "grid grid-cols-3 gap-2",
															children: [
																"low",
																"medium",
																"high"
															].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
																onClick: () => update("riskLevel", r),
																className: `rounded-xl border px-4 py-2 text-xs uppercase tracking-widest transition-all ${form.riskLevel === r ? "border-aether/60 bg-aether/10 text-hi" : "border-line bg-surface/40 text-mid hover:text-hi"}`,
																children: r
															}, r))
														})
													})
												]
											}),
											step === 4 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, {
												label: `Tithe · ${form.tithe} $LMN`,
												hint: "Energy fuels every action. Higher tithe = longer awakening.",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
													type: "range",
													min: 1,
													max: 500,
													step: 1,
													value: form.tithe,
													onChange: (e) => update("tithe", Number(e.target.value)),
													className: "w-full accent-gold"
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "mt-3 grid grid-cols-3 gap-2 text-center font-mono text-[10px] uppercase tracking-widest text-low",
													children: [
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															"Est. uptime",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-plasma text-xs normal-case tracking-normal",
																children: [
																	"~",
																	Math.round(form.tithe * 12),
																	"h"
																]
															})
														] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															"Actions left",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
																className: "text-aether text-xs normal-case tracking-normal",
																children: ["~", form.tithe * 50]
															})
														] }),
														/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
															"Refundable",
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
															/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
																className: "text-gold text-xs normal-case tracking-normal",
																children: "on revoke"
															})
														] })
													]
												})]
											}),
											step === 5 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "space-y-4",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Summary, { form }), !connected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
													className: "rounded-2xl border border-aether/40 bg-aether/5 p-4 text-sm text-mid",
													children: [
														"Bind a wallet to seal the rite.",
														" ",
														/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
															onClick: connect,
															className: "text-gold hover:underline",
															children: "Open the gate →"
														})
													]
												})]
											})
										]
									}),
									errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-6 rounded-xl border border-danger/40 bg-danger/5 p-4",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: "font-display text-[10px] uppercase tracking-[0.3em] text-danger",
												children: "The rite resists"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "mt-2 text-[11px] italic text-mid",
												children: STEP_GUIDANCE[step]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
												className: "mt-3 space-y-1 text-xs text-danger",
												children: errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", e] }, e))
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "mt-8 flex items-center justify-between border-t border-line/60 pt-6",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => setStep((s) => Math.max(0, s - 1)),
											disabled: step === 0,
											className: "rounded-full border border-line bg-surface/40 px-5 py-2 text-xs uppercase tracking-widest text-mid hover:text-hi disabled:opacity-40",
											children: "← Back"
										}), step < 5 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: () => canAdvance && setStep((s) => s + 1),
											disabled: !canAdvance,
											className: "rounded-full border border-aether/60 bg-aether/10 px-6 py-2.5 text-xs uppercase tracking-widest text-aether hover:bg-aether/20 disabled:opacity-40",
											children: "Continue →"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											onClick: seal,
											disabled: !canAdvance || !connected || sealing,
											className: "rounded-full border border-gold/60 bg-gradient-to-b from-gold/20 to-gold/5 px-6 py-2.5 text-xs uppercase tracking-widest text-gold hover:shadow-[var(--glow-gold)] disabled:opacity-40",
											children: sealing ? "Sealing…" : "Seal the binding"
										})]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
								className: "lg:sticky lg:top-24 self-start",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "rounded-2xl border border-line bg-surface/40 p-6 text-center backdrop-blur",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold",
											children: "Sigil preview"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mx-auto mt-4 flex h-56 w-56 items-center justify-center",
											children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
												className: form.name ? "animate-pulse-glow" : "opacity-50",
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
													seed: form.name || "untitled",
													size: 220
												})
											})
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "mt-4 font-display text-lg text-hi",
											children: form.name || "—"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "mt-1 font-mono text-[10px] uppercase tracking-widest text-low",
											children: [
												form.purpose || "no purpose",
												" · ",
												form.riskLevel
											]
										})
									]
								})
							})]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Field({ label, hint, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "font-mono text-[10px] uppercase tracking-widest text-low",
			children: label
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2",
			children
		}),
		hint && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-2 text-[11px] text-mid",
			children: hint
		})
	] });
}
function Summary({ form }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "overflow-hidden rounded-2xl border border-line",
		children: [
			["Name", form.name || "—"],
			["Purpose", form.purpose || "—"],
			["Strategy", form.strategy ? `${form.strategy.slice(0, 60)}${form.strategy.length > 60 ? "…" : ""}` : "—"],
			["Budget", `${form.budget} SOL`],
			["Max / tx", `${form.maxPerTx} SOL`],
			["Risk", form.riskLevel],
			["Tithe", `${form.tithe} $LMN`]
		].map(([k, v], i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: `flex items-center justify-between px-4 py-3 ${i % 2 ? "bg-surface/30" : "bg-surface/60"}`,
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-[10px] uppercase tracking-widest text-low",
				children: k
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "font-mono text-xs text-hi text-right max-w-[60%] truncate",
				children: v
			})]
		}, k))
	});
}
function SealedScene({ name }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "relative isolate",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "starfield absolute inset-0 -z-10",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "mx-auto flex min-h-[80vh] max-w-3xl flex-col items-center justify-center px-6 text-center",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "animate-pulse-glow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
								seed: name,
								size: 360
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-10 font-display text-[11px] uppercase tracking-[0.4em] text-gold",
							children: "The seal holds."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
							className: "font-display mt-3 text-4xl text-hi md:text-5xl text-glow-gold",
							children: "Your Numen is awake."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-4 max-w-md text-sm text-mid",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-display text-hi",
								children: name
							}), " walks the chain in your name. Return to the Sanctum to watch it work."]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/sanctum",
							className: "mt-10 inline-flex items-center gap-2 rounded-full border border-aether/60 bg-aether/10 px-6 py-3 text-xs uppercase tracking-widest text-aether hover:shadow-[var(--glow-aether)]",
							children: "Return to the Sanctum →"
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function validate(f, step) {
	const errs = [];
	if (step >= 0 && (f.name.trim().length < 2 || f.name.trim().length > 32)) {
		if (step === 0) errs.push("Name must be 2–32 characters.");
	}
	if (step === 1 && !f.purpose) errs.push("Choose a purpose.");
	if (step === 2 && f.strategy.trim().length < 10) errs.push("Strategy needs at least 10 characters.");
	if (step === 3 && f.maxPerTx > f.budget) errs.push("Max per tx cannot exceed budget.");
	if (step === 4 && f.tithe < 1) errs.push("Tithe must be at least 1 $LMN.");
	if (step === 5) {
		if (f.name.trim().length < 2) errs.push("Name required.");
		if (!f.purpose) errs.push("Purpose required.");
		if (f.strategy.trim().length < 10) errs.push("Strategy required.");
	}
	return errs;
}
//#endregion
export { Rite as component };
