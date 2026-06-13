import { o as __toESM } from "../_runtime.mjs";
import { h as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { n as shortAddress, r as useNuminaWallet } from "./WalletProvider-B0MXIGoG.mjs";
import { t as supabase } from "./client-BZiZuiJD.mjs";
import { a as Label2, c as Root2, d as SubTrigger2, f as Trigger, i as ItemIndicator2, l as Separator2, n as Content2, o as Portal2, r as Item2, s as RadioItem2, t as CheckboxItem2, u as SubContent2 } from "../_libs/@radix-ui/react-dropdown-menu+[...].mjs";
import { i as Check, n as Circle, r as ChevronRight } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/Sigil-BOFMR7um.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var DropdownMenu = Root2;
var DropdownMenuTrigger = Trigger;
var DropdownMenuSubTrigger = import_react.forwardRef(({ className, inset, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SubTrigger2, {
	ref,
	className: cn("flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none focus:bg-accent data-[state=open]:bg-accent [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", inset && "pl-8", className),
	...props,
	children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ml-auto" })]
}));
DropdownMenuSubTrigger.displayName = SubTrigger2.displayName;
var DropdownMenuSubContent = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SubContent2, {
	ref,
	className: cn("z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-lg data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}));
DropdownMenuSubContent.displayName = SubContent2.displayName;
var DropdownMenuContent = import_react.forwardRef(({ className, sideOffset = 4, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Portal2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Content2, {
	ref,
	sideOffset,
	className: cn("z-50 max-h-[var(--radix-dropdown-menu-content-available-height)] min-w-[8rem] overflow-y-auto overflow-x-hidden rounded-md border bg-popover p-1 text-popover-foreground shadow-md", "data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-dropdown-menu-content-transform-origin)", className),
	...props
}) }));
DropdownMenuContent.displayName = Content2.displayName;
var DropdownMenuItem = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Item2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&>svg]:size-4 [&>svg]:shrink-0", inset && "pl-8", className),
	...props
}));
DropdownMenuItem.displayName = Item2.displayName;
var DropdownMenuCheckboxItem = import_react.forwardRef(({ className, children, checked, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CheckboxItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	checked,
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "h-4 w-4" }) })
	}), children]
}));
DropdownMenuCheckboxItem.displayName = CheckboxItem2.displayName;
var DropdownMenuRadioItem = import_react.forwardRef(({ className, children, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(RadioItem2, {
	ref,
	className: cn("relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50", className),
	...props,
	children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "absolute left-2 flex h-3.5 w-3.5 items-center justify-center",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ItemIndicator2, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Circle, { className: "h-2 w-2 fill-current" }) })
	}), children]
}));
DropdownMenuRadioItem.displayName = RadioItem2.displayName;
var DropdownMenuLabel = import_react.forwardRef(({ className, inset, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Label2, {
	ref,
	className: cn("px-2 py-1.5 text-sm font-semibold", inset && "pl-8", className),
	...props
}));
DropdownMenuLabel.displayName = Label2.displayName;
var DropdownMenuSeparator = import_react.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Separator2, {
	ref,
	className: cn("-mx-1 my-1 h-px bg-muted", className),
	...props
}));
DropdownMenuSeparator.displayName = Separator2.displayName;
var DropdownMenuShortcut = ({ className, ...props }) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("ml-auto text-xs tracking-widest opacity-60", className),
		...props
	});
};
DropdownMenuShortcut.displayName = "DropdownMenuShortcut";
function WalletButton() {
	const { mounted, connected, connecting, publicKey, walletName, connect, disconnect } = useNuminaWallet();
	if (!mounted || !connected || !publicKey) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		onClick: connect,
		disabled: connecting,
		className: "group relative inline-flex items-center gap-2 rounded-full border border-gold/50 bg-gold/5 px-4 py-2 text-xs uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/15 hover:shadow-[var(--glow-gold)] disabled:opacity-60",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 rounded-full bg-gold" }), connecting ? "Opening…" : "Open the Gate"]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenu, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuTrigger, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			className: "inline-flex items-center gap-2 rounded-full border border-aether/50 bg-aether/10 px-4 py-2 font-mono text-xs text-aether transition-all hover:bg-aether/20 hover:shadow-[var(--glow-aether)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-1.5 w-1.5 animate-pulse rounded-full bg-plasma" }), shortAddress(publicKey)]
		})
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DropdownMenuContent, {
		align: "end",
		className: "w-64 border-line bg-surface/95 backdrop-blur",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuLabel, {
				className: "font-display text-[10px] uppercase tracking-[0.3em] text-low",
				children: "Bound vessel"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "px-2 pb-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "text-[10px] uppercase tracking-[0.2em] text-low",
					children: walletName ?? "Wallet"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-1 font-mono text-xs text-hi break-all",
					children: publicKey
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuSeparator, { className: "bg-line/60" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onSelect: (e) => {
					e.preventDefault();
					navigator.clipboard?.writeText(publicKey);
				},
				className: "cursor-pointer text-mid focus:bg-aether/10 focus:text-hi",
				children: "Copy address"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DropdownMenuItem, {
				onSelect: () => disconnect(),
				className: "cursor-pointer text-danger focus:bg-danger/10 focus:text-danger",
				children: "Sever the binding"
			})
		]
	})] });
}
/**
* Client-only auth hook. Subscribes once and exposes the current user.
* Use `useAuth().user?.id` instead of querying Supabase directly in components.
*/
function useAuth() {
	const [session, setSession] = (0, import_react.useState)(null);
	const [loading, setLoading] = (0, import_react.useState)(true);
	(0, import_react.useEffect)(() => {
		let mounted = true;
		const { data: sub } = supabase.auth.onAuthStateChange((_event, s) => {
			if (!mounted) return;
			setSession(s);
			setLoading(false);
		});
		supabase.auth.getSession().then(({ data }) => {
			if (!mounted) return;
			setSession(data.session);
			setLoading(false);
		});
		return () => {
			mounted = false;
			sub.subscription.unsubscribe();
		};
	}, []);
	return {
		session,
		user: session?.user ?? null,
		loading,
		signOut: async () => {
			await supabase.auth.signOut();
		}
	};
}
var nav = [
	{
		to: "/sanctum",
		label: "Sanctum"
	},
	{
		to: "/pantheon",
		label: "Pantheon"
	},
	{
		to: "/choir",
		label: "Choir"
	},
	{
		to: "/aether",
		label: "Aether"
	},
	{
		to: "/lore",
		label: "Mythos"
	}
];
function Header() {
	const { user, loading, signOut } = useAuth();
	const handleSignOut = async () => {
		try {
			await signOut();
			toast("Sigil withdrawn");
		} catch (err) {
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("Could not sign out", { description: msg });
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-40 border-b border-line/60 backdrop-blur-xl bg-[color:var(--void)]/60",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex h-16 max-w-7xl items-center justify-between px-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/",
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "relative inline-flex h-7 w-7 items-center justify-center",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "absolute inset-0 rounded-full bg-aether/30 blur-md" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 24 24",
							className: "relative h-7 w-7",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "12",
									r: "9",
									fill: "none",
									stroke: "oklch(0.83 0.13 85)",
									strokeWidth: "0.8"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
									d: "M12 4 L20 18 L4 18 Z",
									fill: "none",
									stroke: "oklch(0.62 0.22 295)",
									strokeWidth: "1"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
									cx: "12",
									cy: "13",
									r: "2",
									fill: "oklch(0.83 0.13 85)"
								})
							]
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-display text-lg font-semibold tracking-[0.25em] text-hi",
						children: "NÚMINA"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "hidden items-center gap-8 md:flex",
					children: nav.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: n.to,
						className: "text-xs uppercase tracking-[0.2em] text-mid transition-colors hover:text-hi",
						activeProps: { className: "text-hi" },
						children: n.label
					}, n.to))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletButton, {}), !loading && (user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: handleSignOut,
						className: "hidden sm:inline-flex rounded-full border border-line bg-surface/50 px-3 py-1.5 text-[10px] uppercase tracking-widest text-mid hover:text-hi",
						title: user.email ?? "",
						children: "Sign out"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/auth",
						className: "rounded-full border border-gold/60 bg-gold/10 px-3 py-1.5 text-[10px] uppercase tracking-widest text-gold hover:shadow-[var(--glow-gold)]",
						children: "Sign in"
					}))]
				})
			]
		})
	});
}
function Footer() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "relative mt-32 border-t border-line/60",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "glyph-divider absolute inset-x-0 top-0" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto grid max-w-7xl gap-12 px-6 py-16 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "md:col-span-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "font-display text-xl tracking-[0.3em] text-hi",
								children: "NÚMINA"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-4 max-w-sm text-sm leading-relaxed text-mid",
								children: "Summon intelligence. Bind it to the chain. A non-custodial protocol for autonomous on-chain agents on Solana."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-low",
								children: "Devnet · v0.1 · not financial advice"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-[11px] uppercase tracking-[0.25em] text-low",
						children: "Protocol"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm text-mid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/sanctum",
								className: "hover:text-hi",
								children: "Sanctum"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/pantheon",
								className: "hover:text-hi",
								children: "Pantheon"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/choir",
								className: "hover:text-hi",
								children: "Choir"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/aether",
								className: "hover:text-hi",
								children: "Aether"
							}) })
						]
					})] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h4", {
						className: "mb-4 text-[11px] uppercase tracking-[0.25em] text-low",
						children: "Mythos"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
						className: "space-y-3 text-sm text-mid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/lore",
								className: "hover:text-hi",
								children: "Docs"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://github.com",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "hover:text-hi",
								children: "GitHub"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://x.com",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "hover:text-hi",
								children: "X / Twitter"
							}) }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "https://discord.com",
								target: "_blank",
								rel: "noreferrer noopener",
								className: "hover:text-hi",
								children: "Discord"
							}) })
						]
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "border-t border-line/40 px-6 py-6",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mx-auto max-w-7xl text-center text-[11px] text-low",
					children: "The signal flows through the Silence. Trade at your own risk. Numina holds no custody."
				})
			})
		]
	});
}
/**
* Generative sigil — deterministic from a seed string.
* Sacred circle + glyph paths derived from a tiny hash of the seed.
*/
function hashSeed(seed) {
	const out = [];
	let h = 2166136261;
	for (let i = 0; i < seed.length; i++) {
		h ^= seed.charCodeAt(i);
		h = Math.imul(h, 16777619);
		out.push((h >>> 0) % 1e3);
	}
	while (out.length < 24) {
		h = Math.imul(h ^ out.length, 16777619);
		out.push((h >>> 0) % 1e3);
	}
	return out;
}
function Sigil({ seed = "numina-prime", size = 480, className }) {
	const points = (0, import_react.useMemo)(() => {
		const h = hashSeed(seed);
		const n = 7 + h[0] % 5;
		const r = 140;
		const cx = 250;
		const cy = 250;
		return Array.from({ length: n }, (_, i) => {
			const a = i / n * Math.PI * 2 - Math.PI / 2;
			const jitter = .85 + h[i + 1] % 30 / 100;
			return {
				x: cx + Math.cos(a) * r * jitter,
				y: cy + Math.sin(a) * r * jitter
			};
		});
	}, [seed]);
	const innerPath = (0, import_react.useMemo)(() => {
		const n = points.length;
		const step = n % 2 === 0 ? 3 : 2;
		let d = "";
		for (let i = 0; i < n; i++) {
			const p = points[i * step % n];
			d += (i === 0 ? "M" : "L") + p.x + "," + p.y + " ";
		}
		return d + "Z";
	}, [points]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 500 500",
		width: size,
		height: size,
		className,
		role: "img",
		"aria-label": "Sacred sigil",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("defs", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("radialGradient", {
				id: "sigilGlow",
				cx: "50%",
				cy: "50%",
				r: "50%",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "0%",
						stopColor: "oklch(0.83 0.13 85)",
						stopOpacity: "0.35"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "60%",
						stopColor: "oklch(0.62 0.22 295)",
						stopOpacity: "0.15"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
						offset: "100%",
						stopColor: "oklch(0.62 0.22 295)",
						stopOpacity: "0"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "ringGrad",
				x1: "0",
				y1: "0",
				x2: "1",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0%",
					stopColor: "oklch(0.83 0.13 85)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "100%",
					stopColor: "oklch(0.62 0.22 295)"
				})]
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
				cx: "250",
				cy: "250",
				r: "240",
				fill: "url(#sigilGlow)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "animate-slow-spin",
				style: { transformOrigin: "250px 250px" },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "250",
						cy: "250",
						r: "220",
						fill: "none",
						stroke: "url(#ringGrad)",
						strokeWidth: "0.6",
						opacity: "0.6"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "250",
						cy: "250",
						r: "200",
						fill: "none",
						stroke: "oklch(0.62 0.22 295)",
						strokeWidth: "0.4",
						strokeDasharray: "2 8",
						opacity: "0.5"
					}),
					Array.from({ length: 36 }).map((_, i) => {
						const a = i / 36 * Math.PI * 2;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: 250 + Math.cos(a) * 196,
							y1: 250 + Math.sin(a) * 196,
							x2: 250 + Math.cos(a) * (i % 3 === 0 ? 182 : 190),
							y2: 250 + Math.sin(a) * (i % 3 === 0 ? 182 : 190),
							stroke: "oklch(0.83 0.13 85)",
							strokeWidth: "0.5",
							opacity: i % 3 === 0 ? .8 : .35
						}, i);
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				className: "animate-slow-spin-rev",
				style: { transformOrigin: "250px 250px" },
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "170",
					fill: "none",
					stroke: "oklch(0.83 0.13 85)",
					strokeWidth: "0.4",
					opacity: "0.4"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "160",
					fill: "none",
					stroke: "oklch(0.62 0.22 295)",
					strokeWidth: "0.3",
					strokeDasharray: "1 4",
					opacity: "0.6"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "140",
					fill: "none",
					stroke: "oklch(0.83 0.13 85 / 0.7)",
					strokeWidth: "0.8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: innerPath,
					fill: "none",
					stroke: "oklch(0.62 0.22 295)",
					strokeWidth: "1.2",
					opacity: "0.9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
					d: innerPath,
					fill: "oklch(0.62 0.22 295 / 0.06)",
					stroke: "oklch(0.83 0.13 85 / 0.8)",
					strokeWidth: "0.4"
				}),
				points.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: p.x,
					cy: p.y,
					r: "3.5",
					fill: "oklch(0.83 0.13 85)"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: p.x,
					cy: p.y,
					r: "8",
					fill: "oklch(0.83 0.13 85 / 0.15)"
				})] }, i)),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "42",
					fill: "none",
					stroke: "oklch(0.83 0.13 85)",
					strokeWidth: "0.6"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "28",
					fill: "none",
					stroke: "oklch(0.62 0.22 295)",
					strokeWidth: "0.8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "10",
					fill: "oklch(0.83 0.13 85)",
					opacity: "0.9"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "250",
					cy: "250",
					r: "4",
					fill: "oklch(0.08 0.02 285)"
				})
			] })
		]
	});
}
//#endregion
export { useAuth as a, cn as i, Header as n, Sigil as r, Footer as t };
