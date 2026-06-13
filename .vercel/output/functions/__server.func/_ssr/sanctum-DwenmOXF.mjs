import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { D as Slot, P as require_jsx_runtime, a as Overlay2, c as Title2, d as Description, f as Overlay, h as Title, i as Description2, l as Close, m as Root, n as Cancel, o as Portal2, p as Portal, r as Content2, s as Root2, t as Action, u as Content } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as shortAddress, r as useNuminaWallet } from "./WalletProvider-B0MXIGoG.mjs";
import { t as supabase } from "./client-BZiZuiJD.mjs";
import { t as X } from "../_libs/lucide-react.mjs";
import { t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { i as cn, n as Header, r as Sigil, t as Footer } from "./Sigil-BOFMR7um.mjs";
import { n as insertActivity, t as clearActivity } from "./activity.functions-BI_xq-Ki.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/sanctum-DwenmOXF.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var MOCK_NUMINA = [
	{
		id: "0001",
		name: "Ember of Pyth",
		seed: "wallet-ember-pyth",
		purpose: "trading",
		status: "awake",
		pnl: 124.32,
		winRate: .71,
		actions: 184,
		uptime: .992,
		lastAction: "Bought 4.2 SOL @ 142.31 · 12s ago"
	},
	{
		id: "0002",
		name: "Watcher in the Liquidity",
		seed: "wallet-watcher-liquidity",
		purpose: "monitor",
		status: "awake",
		pnl: 0,
		winRate: 0,
		actions: 904,
		uptime: .999,
		lastAction: "Pinged · whale tx 312 SOL · 1m ago"
	},
	{
		id: "0003",
		name: "Choir of Mean Reversion",
		seed: "wallet-choir-mean-reversion",
		purpose: "trading",
		status: "silence",
		pnl: -8.7,
		winRate: .58,
		actions: 42,
		uptime: .84,
		lastAction: "Paused — risk ceiling reached · 2h ago"
	},
	{
		id: "0004",
		name: "Daemon of the Breakout",
		seed: "wallet-daemon-breakout",
		purpose: "trading",
		status: "failed",
		pnl: -2.1,
		winRate: .31,
		actions: 11,
		uptime: .42,
		lastAction: "Failed — oracle stale · 4h ago"
	}
];
var MAX = 200;
function relativeTime(iso) {
	const then = new Date(iso).getTime();
	const diff = Math.max(0, Date.now() - then);
	const s = Math.floor(diff / 1e3);
	if (s < 5) return "now";
	if (s < 60) return `${s}s`;
	const m = Math.floor(s / 60);
	if (m < 60) return `${m}m`;
	const h = Math.floor(m / 60);
	if (h < 24) return `${h}h`;
	return `${Math.floor(h / 24)}d`;
}
function useActivityStream() {
	const [entries, setEntries] = (0, import_react.useState)([]);
	const [status, setStatus] = (0, import_react.useState)("loading");
	const [error, setError] = (0, import_react.useState)(null);
	const [tick, setTick] = (0, import_react.useState)(0);
	(0, import_react.useEffect)(() => {
		const id = setInterval(() => setTick((t) => t + 1), 15e3);
		return () => clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		let cancelled = false;
		async function load() {
			try {
				const { data, error: err } = await supabase.from("activity").select("id, numen, kind, text, created_at").order("created_at", { ascending: false }).limit(MAX);
				if (cancelled) return;
				if (err) throw err;
				setEntries(data ?? []);
				setError(null);
			} catch (e) {
				if (cancelled) return;
				setError(e instanceof Error ? e.message : "Failed to load activity");
				setStatus("error");
			}
		}
		load();
		const channel = supabase.channel("activity-stream").on("postgres_changes", {
			event: "INSERT",
			schema: "public",
			table: "activity"
		}, (payload) => {
			const row = payload.new;
			setEntries((prev) => {
				if (prev.some((e) => e.id === row.id)) return prev;
				return [row, ...prev].slice(0, MAX);
			});
		}).on("postgres_changes", {
			event: "DELETE",
			schema: "public",
			table: "activity"
		}, () => {
			load();
		}).subscribe((s) => {
			if (cancelled) return;
			if (s === "SUBSCRIBED") {
				setStatus("live");
				setError(null);
			} else if (s === "CHANNEL_ERROR" || s === "TIMED_OUT") {
				setStatus("error");
				setError("Realtime channel disconnected");
			} else if (s === "CLOSED") setStatus("reconnecting");
		});
		return () => {
			cancelled = true;
			supabase.removeChannel(channel);
		};
	}, []);
	return {
		entries,
		status,
		error,
		push: (0, import_react.useCallback)(async (entry) => {
			try {
				await insertActivity({ data: entry });
			} catch (e) {
				const msg = e instanceof Error ? e.message : "Failed to record activity";
				throw new Error(msg);
			}
		}, []),
		clear: (0, import_react.useCallback)(async () => {
			try {
				await clearActivity();
				setEntries([]);
			} catch (e) {
				const msg = e instanceof Error ? e.message : "Failed to clear activity";
				throw new Error(msg);
			}
		}, []),
		_tick: tick
	};
}
var Dialog = Root;
var DialogPortal = Portal;
var DialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay, {
	ref,
	className: cn("fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props
}));
DialogOverlay.displayName = Overlay.displayName;
var DialogContent = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Content, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Close, {
		className: "absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background cursor-pointer transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "h-4 w-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "sr-only",
			children: "Close"
		})]
	})]
})] }));
DialogContent.displayName = Content.displayName;
var DialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-1.5 text-center sm:text-left", className),
	...props
});
DialogHeader.displayName = "DialogHeader";
var DialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
DialogFooter.displayName = "DialogFooter";
var DialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title, {
	ref,
	className: cn("text-lg font-semibold leading-none tracking-tight", className),
	...props
}));
DialogTitle.displayName = Title.displayName;
var DialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
DialogDescription.displayName = Description.displayName;
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var AlertDialog = Root2;
var AlertDialogPortal = Portal2;
var AlertDialogOverlay = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Overlay2, {
	className: cn("fixed inset-0 z-50 bg-black/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0", className),
	...props,
	ref
}));
AlertDialogOverlay.displayName = Overlay2.displayName;
var AlertDialogContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogOverlay, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	className: cn("fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 sm:rounded-lg", className),
	...props
})] }));
AlertDialogContent.displayName = Content2.displayName;
var AlertDialogHeader = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col space-y-2 text-center sm:text-left", className),
	...props
});
AlertDialogHeader.displayName = "AlertDialogHeader";
var AlertDialogFooter = ({ className, ...props }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
	className: cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2", className),
	...props
});
AlertDialogFooter.displayName = "AlertDialogFooter";
var AlertDialogTitle = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Title2, {
	ref,
	className: cn("text-lg font-semibold", className),
	...props
}));
AlertDialogTitle.displayName = Title2.displayName;
var AlertDialogDescription = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Description2, {
	ref,
	className: cn("text-sm text-muted-foreground", className),
	...props
}));
AlertDialogDescription.displayName = Description2.displayName;
var AlertDialogAction = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
	ref,
	className: cn(buttonVariants(), className),
	...props
}));
AlertDialogAction.displayName = Action.displayName;
var AlertDialogCancel = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Cancel, {
	ref,
	className: cn(buttonVariants({ variant: "outline" }), "mt-2 sm:mt-0", className),
	...props
}));
AlertDialogCancel.displayName = Cancel.displayName;
function Sanctum() {
	const { connected, publicKey, connect } = useNuminaWallet();
	const total = MOCK_NUMINA.length;
	const awake = MOCK_NUMINA.filter((n) => n.status === "awake").length;
	const pnl = MOCK_NUMINA.reduce((s, n) => s + n.pnl, 0);
	const { entries, status, error, push, clear } = useActivityStream();
	const [selected, setSelected] = (0, import_react.useState)(null);
	const [confirmReset, setConfirmReset] = (0, import_react.useState)(false);
	const [clearing, setClearing] = (0, import_react.useState)(false);
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
					className: "mx-auto max-w-7xl px-6 pt-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ritual-border relative overflow-hidden rounded-3xl p-6 md:p-8",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "absolute inset-0 bg-[radial-gradient(500px_200px_at_30%_0%,oklch(0.62_0.22_295/0.18),transparent_70%)]" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "relative flex flex-wrap items-center justify-between gap-6",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-5",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "relative h-16 w-16 shrink-0",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
										seed: publicKey ?? "sanctum-altar",
										size: 64
									})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
										className: "font-display text-[11px] uppercase tracking-[0.4em] text-gold",
										children: "The Sanctum"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
										className: "font-display mt-1 text-2xl text-hi md:text-3xl",
										children: connected ? "Your altar listens." : "Your altar awaits."
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "mt-1 font-mono text-xs text-mid",
										children: connected && publicKey ? shortAddress(publicKey) : "no vessel bound"
									})
								] })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AetherMeter, {
								awake,
								total,
								pnl
							})]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-10 grid gap-8 lg:grid-cols-[1fr_360px]",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 flex items-end justify-between",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold",
									children: "Bound Numina"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
									className: "font-display mt-2 text-2xl text-hi",
									children: [
										total,
										" vessels · ",
										awake,
										" awake"
									]
								})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/sanctum/invoke",
									className: "inline-flex items-center gap-2 rounded-full border border-gold/60 bg-gradient-to-b from-gold/20 to-gold/5 px-5 py-2.5 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:shadow-[var(--glow-gold)]",
									children: ["Begin the Rite", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										"aria-hidden": true,
										children: "→"
									})]
								})]
							}),
							!connected && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mb-6 rounded-2xl border border-aether/40 bg-aether/5 p-5 text-sm text-mid",
								children: [
									"Bind a wallet to summon Numina of your own.",
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: connect,
										className: "text-gold hover:underline",
										children: "Open the gate →"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "grid gap-4 sm:grid-cols-2",
								children: MOCK_NUMINA.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumenCard, {
									n,
									onOpen: () => setSelected(n)
								}, n.id))
							})
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("aside", {
							className: "lg:sticky lg:top-24 self-start",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogStream, {
								entries,
								status,
								error,
								onReset: () => setConfirmReset(true)
							})
						})]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Footer, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(NumenDialog, {
				numen: selected,
				onClose: () => setSelected(null),
				entries,
				push
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
				open: confirmReset,
				onOpenChange: setConfirmReset,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
					className: "border-line bg-surface/95 backdrop-blur-xl",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogTitle, {
						className: "font-display text-hi",
						children: "Silence the LogStream?"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "This clears every whisper from the altar. The Numina will not lose memory — only the visible record." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
						disabled: clearing,
						children: "Cancel"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
						disabled: clearing,
						onClick: async (e) => {
							e.preventDefault();
							setClearing(true);
							try {
								await clear();
								toast.success("LogStream silenced");
								setConfirmReset(false);
							} catch (err) {
								const msg = err instanceof Error ? err.message : "Unknown error";
								toast.error("Could not silence", { description: msg });
							} finally {
								setClearing(false);
							}
						},
						children: clearing ? "Silencing…" : "Silence"
					})] })]
				})
			})
		]
	});
}
function AetherMeter({ awake, total, pnl }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "grid grid-cols-3 gap-6 rounded-2xl border border-line bg-surface/40 px-6 py-4 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "Awake",
				value: `${awake}/${total}`,
				tone: "plasma"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "24h PnL",
				value: `${pnl >= 0 ? "+" : ""}${pnl.toFixed(2)}`,
				tone: pnl >= 0 ? "plasma" : "danger"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
				label: "$LMN",
				value: "318.4",
				tone: "gold"
			})
		]
	});
}
function Stat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `font-mono text-lg ${tone === "gold" ? "text-gold" : tone === "plasma" ? "text-plasma" : tone === "danger" ? "text-danger" : "text-aether"}`,
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mt-1 text-[10px] uppercase tracking-[0.2em] text-low",
		children: label
	})] });
}
function NumenCard({ n, onOpen }) {
	const statusTone = n.status === "awake" ? "text-plasma" : n.status === "silence" ? "text-mid" : "text-danger";
	const statusDot = n.status === "awake" ? "bg-plasma animate-pulse" : n.status === "silence" ? "bg-mid" : "bg-danger";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick: onOpen,
		className: `group relative w-full overflow-hidden rounded-2xl border border-line bg-surface/40 p-5 text-left backdrop-blur transition-all hover:border-aether/50 hover:shadow-[var(--glow-aether)] ${n.status !== "awake" ? "opacity-70" : ""}`,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-start justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "relative h-14 w-14",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
							seed: n.seed,
							size: 56
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "font-display text-base text-hi",
						children: n.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-1 font-mono text-[10px] uppercase tracking-[0.2em] text-low",
						children: n.purpose
					})] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${statusTone}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${statusDot}` }), n.status]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 grid grid-cols-3 gap-2 border-t border-line/60 pt-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "PnL",
						value: `${n.pnl >= 0 ? "+" : ""}${n.pnl.toFixed(1)}`,
						tone: n.pnl >= 0 ? "plasma" : "danger"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Win",
						value: `${Math.round(n.winRate * 100)}%`,
						tone: "aether"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MiniStat, {
						label: "Acts",
						value: `${n.actions}`,
						tone: "gold"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-3 truncate text-xs text-mid",
				children: n.lastAction
			})
		]
	});
}
function MiniStat({ label, value, tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: `font-mono text-sm ${tone === "gold" ? "text-gold" : tone === "plasma" ? "text-plasma" : tone === "danger" ? "text-danger" : "text-aether"}`,
		children: value
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "text-[9px] uppercase tracking-[0.2em] text-low",
		children: label
	})] });
}
function LogStream({ entries, status, error, onReset }) {
	const loading = status === "loading";
	const live = status === "live";
	const offline = status === "error" || !!error;
	const reconnecting = status === "reconnecting";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-2xl border border-line bg-surface/40 p-5 backdrop-blur",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-4 flex items-center justify-between",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "font-display text-[10px] uppercase tracking-[0.4em] text-gold",
				children: "LogStream"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-1 text-xs text-mid",
				children: offline ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-danger",
					children: error ?? "stream offline"
				}) : reconnecting ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "text-warning",
					children: "reconnecting…"
				}) : "Realtime · all bound Numina"
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex items-center gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest ${offline ? "text-danger" : live ? "text-plasma" : "text-mid"}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: `h-1.5 w-1.5 rounded-full ${offline ? "bg-danger" : live ? "bg-plasma animate-pulse" : "bg-mid animate-pulse"}` }), offline ? "offline" : live ? "live" : reconnecting ? "retry…" : "binding…"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: onReset,
					className: "font-mono text-[10px] uppercase tracking-widest text-low hover:text-hi",
					"aria-label": "Reset log",
					title: "Reset log",
					children: "reset"
				})]
			})]
		}), loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "space-y-3",
			children: Array.from({ length: 4 }).map((_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "border-l border-line/60 pl-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-2 w-24 animate-pulse rounded bg-line/60" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mt-2 h-3 w-full animate-pulse rounded bg-line/40" })]
			}, i))
		}) : entries.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "py-6 text-center text-xs italic text-mid",
			children: offline ? "The stream is broken. Try refreshing." : "The altar is silent. No whispers yet."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-3 max-h-[520px] overflow-y-auto pr-1",
			children: entries.map((e) => {
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "border-l border-line/60 pl-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between font-mono text-[10px] uppercase tracking-widest",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: e.kind === "trade" ? "text-plasma" : e.kind === "alert" ? "text-warning" : e.kind === "error" ? "text-danger" : "text-aether",
								children: ["● ", e.kind]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-low",
								children: relativeTime(e.created_at)
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-1 text-xs text-hi",
							children: e.text
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-0.5 text-[10px] text-low",
							children: e.numen
						})
					]
				}, e.id);
			})
		})]
	});
}
function NumenDialog({ numen, onClose, entries, push }) {
	const open = numen !== null;
	const [busy, setBusy] = (0, import_react.useState)(null);
	const [confirmSever, setConfirmSever] = (0, import_react.useState)(false);
	const related = (0, import_react.useMemo)(() => numen ? entries.filter((e) => e.numen === numen.name).slice(0, 8) : [], [entries, numen]);
	if (!numen) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {})
	});
	const statusTone = numen.status === "awake" ? "text-plasma" : numen.status === "silence" ? "text-mid" : "text-danger";
	const toggleLabel = numen.status === "awake" ? "Enter Silence" : "Awaken";
	const handleToggle = async () => {
		setBusy("toggle");
		try {
			await push({
				numen: numen.name,
				kind: numen.status === "awake" ? "decision" : "alert",
				text: numen.status === "awake" ? "Entered Silence — paused by overseer" : "Awoken — overseer resumed the rite"
			});
			toast.success(numen.status === "awake" ? `${numen.name} entered Silence` : `${numen.name} awoken`);
			onClose();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("Rite failed", { description: msg });
		} finally {
			setBusy(null);
		}
	};
	const handleSever = async () => {
		setBusy("sever");
		try {
			await push({
				numen: numen.name,
				kind: "error",
				text: "Binding severed — funds returned"
			});
			toast.success(`${numen.name} severed`, { description: "Funds returned to your wallet." });
			onClose();
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("Sever failed", { description: msg });
		} finally {
			setBusy(null);
			setConfirmSever(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Dialog, {
		open,
		onOpenChange: (o) => !o && onClose(),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: "max-w-lg border-line bg-surface/95 backdrop-blur-xl",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sigil, {
						seed: numen.seed,
						size: 64
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
						className: "font-display text-xl text-hi",
						children: numen.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, {
						className: `font-mono text-[10px] uppercase tracking-widest ${statusTone}`,
						children: [
							"● ",
							numen.status,
							" · ",
							numen.purpose
						]
					})] })]
				}) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid grid-cols-3 gap-4 border-y border-line/60 py-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "PnL",
							value: `${numen.pnl >= 0 ? "+" : ""}${numen.pnl.toFixed(2)}`,
							tone: numen.pnl >= 0 ? "plasma" : "danger"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Win rate",
							value: `${Math.round(numen.winRate * 100)}%`,
							tone: "aether"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
							label: "Uptime",
							value: `${Math.round(numen.uptime * 100)}%`,
							tone: "gold"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "font-display text-[10px] uppercase tracking-[0.3em] text-gold",
					children: "Recent activity"
				}), related.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-3 text-xs italic text-mid",
					children: "The Numen has whispered nothing yet."
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
					className: "mt-3 space-y-2 max-h-48 overflow-y-auto pr-1",
					children: related.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
						className: "border-l border-line/60 pl-3 text-xs text-hi",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] uppercase tracking-widest text-low",
							children: [
								e.kind,
								" · ",
								relativeTime(e.created_at)
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: e.text })]
					}, e.id))
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogFooter, {
					className: "gap-2 sm:gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: handleToggle,
						disabled: busy !== null,
						className: "rounded-full border border-aether/50 bg-aether/10 px-4 py-2 text-[11px] uppercase tracking-widest text-aether hover:bg-aether/20 disabled:opacity-50 disabled:cursor-not-allowed",
						children: busy === "toggle" ? "Working…" : toggleLabel
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setConfirmSever(true),
						disabled: busy !== null,
						className: "rounded-full border border-danger/50 bg-danger/5 px-4 py-2 text-[11px] uppercase tracking-widest text-danger hover:bg-danger/15 disabled:opacity-50 disabled:cursor-not-allowed",
						children: busy === "sever" ? "Severing…" : "Sever"
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialog, {
			open: confirmSever,
			onOpenChange: (o) => !busy && setConfirmSever(o),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogContent, {
				className: "border-line bg-surface/95 backdrop-blur-xl",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogTitle, {
					className: "font-display text-hi",
					children: [
						"Sever ",
						numen.name,
						"?"
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogDescription, { children: "The binding is broken irrevocably. Funds return to your wallet; the Numen falls silent." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AlertDialogFooter, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogCancel, {
					disabled: busy === "sever",
					children: "Stay bound"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AlertDialogAction, {
					onClick: (e) => {
						e.preventDefault();
						handleSever();
					},
					disabled: busy === "sever",
					className: "bg-danger text-background hover:bg-danger/90",
					children: busy === "sever" ? "Severing…" : "Sever"
				})] })]
			})
		})]
	});
}
//#endregion
export { Sanctum as component };
