import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-2Hyq2Z8T.js
var import_jsx_runtime = require_jsx_runtime();
function TheGate() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-screen",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hero, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Premise, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LiveChoir, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Rite, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Featured, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Safety, {})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {})
		]
	});
}
function Hero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "relative isolate overflow-hidden",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "starfield absolute inset-0 -z-10",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "absolute inset-x-0 top-0 -z-10 h-[800px] bg-[radial-gradient(800px_500px_at_50%_20%,oklch(0.62_0.22_295/0.15),transparent_70%)]",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl items-center gap-12 px-6 pb-32 pt-20 lg:grid-cols-2 lg:pt-32",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mb-8 inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-3 py-1.5 text-[11px] uppercase tracking-[0.25em] text-mid backdrop-blur",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-plasma" }), "Protocol live on Solana devnet"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display text-5xl font-semibold leading-[1.05] text-hi md:text-6xl lg:text-7xl",
						children: [
							"Summon",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"intelligence.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-glow-gold text-gold",
								children: "Bind it to the chain."
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-8 max-w-lg text-base leading-relaxed text-mid md:text-lg",
						children: "NÚMINA is the rite by which autonomous AI agents — Numina — are invoked, bound to your wallet, and set to act on-chain within ritual guardrails. They watch the markets. They interpret the signs. You sleep."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 flex flex-wrap items-center gap-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/sanctum",
							className: "group relative inline-flex items-center gap-2 overflow-hidden rounded-full border border-gold/60 bg-gradient-to-b from-gold/20 to-gold/5 px-7 py-3.5 text-sm font-medium uppercase tracking-[0.2em] text-gold transition-all hover:from-gold/30 hover:to-gold/10 hover:shadow-[var(--glow-gold)]",
							children: ["Open the Gate", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								"aria-hidden": true,
								children: "→"
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/lore",
							className: "inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 px-7 py-3.5 text-sm uppercase tracking-[0.2em] text-mid backdrop-blur transition-colors hover:border-aether/50 hover:text-hi",
							children: "Read the Mythos"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
						className: "mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line/60 pt-8",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Numina awake",
								value: "1,284",
								tone: "plasma"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Rites today",
								value: "319",
								tone: "gold"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
								label: "Choir signals",
								value: "42.7K",
								tone: "aether"
							})
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "relative flex items-center justify-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(circle_at_center,oklch(0.62_0.22_295/0.25),transparent_60%)] blur-2xl" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "animate-pulse-glow",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
							seed: "numina-genesis-001",
							size: 560,
							className: "max-w-full"
						})
					})]
				})]
			})
		]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
		className: `font-mono text-2xl ${tone === "gold" ? "text-gold" : tone === "plasma" ? "text-plasma" : "text-aether"}`,
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
		className: "mt-1 text-[10px] uppercase tracking-[0.2em] text-low",
		children: label
	})] });
}
function Premise() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
		eyebrow: "The Premise",
		title: "Three movements of the rite",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-6 md:grid-cols-3",
			children: [
				{
					step: "I.",
					title: "Invoke",
					body: "Name a Numen. Forge its sigil from the hash of your wallet. Six steps. One signature."
				},
				{
					step: "II.",
					title: "Bind",
					body: "Delegate scoped authority to a PDA. Budget, max-per-tx, and revocation enforced on-chain."
				},
				{
					step: "III.",
					title: "Awaken",
					body: "Your Numen reads price, oracle, and on-chain signal. It decides. It acts. It logs. You watch."
				}
			].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "ritual-border group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 hover:shadow-[var(--glow-aether)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "font-display text-xs tracking-[0.4em] text-gold",
						children: c.step
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-4 text-2xl text-hi",
						children: c.title
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-4 text-sm leading-relaxed text-mid",
						children: c.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-aether/10 blur-3xl transition-opacity group-hover:bg-aether/20" })
				]
			}, c.step))
		})
	});
}
function LiveChoir() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
		className: "mx-auto mt-24 max-w-7xl px-6",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ritual-border relative overflow-hidden rounded-3xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(600px_200px_at_50%_0%,oklch(0.62_0.22_295/0.18),transparent_70%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "relative grid grid-cols-2 gap-6 px-8 py-10 md:grid-cols-4 md:px-12",
				children: [
					{
						label: "Numina awake",
						value: "1,284",
						tone: "plasma"
					},
					{
						label: "Actions / 24h",
						value: "47,902",
						tone: "gold"
					},
					{
						label: "$LMN tithed",
						value: "318,440",
						tone: "aether"
					},
					{
						label: "Strategies in Pantheon",
						value: "612",
						tone: "plasma"
					}
				].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "text-center md:text-left",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: `font-mono text-3xl md:text-4xl ${c.tone === "gold" ? "text-gold" : c.tone === "plasma" ? "text-plasma" : "text-aether"}`,
						children: c.value
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-2 text-[10px] uppercase tracking-[0.25em] text-low",
						children: c.label
					})]
				}, c.label))
			})]
		})
	});
}
function Rite() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
		eyebrow: "The Rite",
		title: "Six steps from silence to awakening",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 sm:grid-cols-2 lg:grid-cols-3",
			children: [
				{
					n: "01",
					t: "Naming",
					d: "Choose a name. The sigil emerges deterministic from its seed."
				},
				{
					n: "02",
					t: "Purpose",
					d: "Trader, monitor, or task runner — the Numen's reason for waking."
				},
				{
					n: "03",
					t: "Strategy",
					d: "Clone a Pantheon template, or author your own rule set."
				},
				{
					n: "04",
					t: "Bounds",
					d: "Budget, max-per-tx, and risk profile. Guardrails are on-chain."
				},
				{
					n: "05",
					t: "Tithe",
					d: "Stake $LMN to grant the Numen energy to act on your behalf."
				},
				{
					n: "06",
					t: "Seal",
					d: "Sign once. The PDA is forged. The Sigil is minted. The Numen awakens."
				}
			].map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "group relative rounded-2xl border border-line bg-surface/40 p-6 backdrop-blur transition-all hover:border-aether/50",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-baseline justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-mono text-xs text-low",
							children: s.n
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "font-display text-[10px] tracking-[0.3em] text-gold/60",
							children: i === 5 ? "SEAL" : "STEP"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-3 text-xl text-hi",
						children: s.t
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 text-sm leading-relaxed text-mid",
						children: s.d
					})
				]
			}, s.n))
		})
	});
}
function Featured() {
	const items = [
		{
			name: "Ember of Pyth",
			risk: "Low",
			asset: "SOL/USDC",
			roi: "+12.4%",
			followers: 412
		},
		{
			name: "Choir of Mean Reversion",
			risk: "Med",
			asset: "JUP/USDC",
			roi: "+28.1%",
			followers: 1108
		},
		{
			name: "Watcher in the Liquidity",
			risk: "Low",
			asset: "Multi",
			roi: "+8.7%",
			followers: 286
		},
		{
			name: "Daemon of the Breakout",
			risk: "High",
			asset: "WIF/USDC",
			roi: "+61.2%",
			followers: 2204
		}
	];
	const riskTone = (r) => r === "Low" ? "text-plasma" : r === "Med" ? "text-warning" : "text-danger";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
		eyebrow: "From the Pantheon",
		title: "Featured strategies",
		action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/pantheon",
			className: "text-xs uppercase tracking-[0.25em] text-mid hover:text-hi",
			children: "Enter the Pantheon →"
		}),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-4 md:grid-cols-2 xl:grid-cols-4",
			children: items.map((s, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
				className: "group relative overflow-hidden rounded-2xl border border-line bg-surface/40 p-6 backdrop-blur transition-all hover:border-aether/50 hover:shadow-[var(--glow-aether)]",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "relative h-14 w-14",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
								seed: `pantheon-${idx}-${s.name}`,
								size: 56
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: `font-mono text-xs uppercase tracking-widest ${riskTone(s.risk)}`,
							children: ["● ", s.risk]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display mt-5 text-base text-hi",
						children: s.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-mono text-xs text-low",
						children: s.asset
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-6 flex items-end justify-between border-t border-line/60 pt-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "text-[10px] uppercase tracking-[0.2em] text-low",
							children: "30d ROI"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "font-mono text-lg text-plasma",
							children: s.roi
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "text-right",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "text-[10px] uppercase tracking-[0.2em] text-low",
								children: "Bound"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-mono text-lg text-hi",
								children: s.followers
							})]
						})]
					})
				]
			}, s.name))
		})
	});
}
function Safety() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionShell, {
		eyebrow: "Safety & sovereignty",
		title: "The chain is the final authority",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "grid gap-px overflow-hidden rounded-3xl border border-line bg-line",
			children: [
				{
					t: "Non-custodial by design",
					d: "Numina never hold your private key. Delegated authority is scoped and revocable."
				},
				{
					t: "Guardrails on-chain",
					d: "Budget and max-per-tx are enforced inside the Anchor program — not in the backend."
				},
				{
					t: "Revoke at any moment",
					d: "One signature returns delegated funds and silences the Numen. The rite is reversible."
				}
			].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "bg-surface/60 p-8 md:p-10",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "font-display text-lg text-hi",
					children: p.t
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 max-w-2xl text-sm leading-relaxed text-mid",
					children: p.d
				})]
			}, p.t))
		})
	});
}
function SectionShell({ eyebrow, title, action, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "mx-auto mt-32 max-w-7xl px-6",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mb-10 flex flex-wrap items-end justify-between gap-6",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-[11px] uppercase tracking-[0.4em] text-gold",
					children: eyebrow
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "font-display mt-3 text-3xl text-hi md:text-4xl",
					children: title
				})] }), action]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glyph-divider mb-10" }),
			children
		]
	});
}
//#endregion
export { TheGate as component };
