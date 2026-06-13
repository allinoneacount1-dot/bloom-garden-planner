import { o as __toESM } from "../_runtime.mjs";
import { u as require_react } from "../_libs/@floating-ui/react-dom+[...].mjs";
import { P as require_jsx_runtime } from "../_libs/@radix-ui/react-alert-dialog+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { V as clusterApiUrl } from "../_libs/@solana-mobile/wallet-adapter-mobile.mjs";
import { n as useWallet, r as ConnectionProvider, t as WalletProvider } from "../_libs/@solana/wallet-adapter-react+[...].mjs";
import { t as WalletAdapterNetwork } from "../_libs/solana__wallet-adapter-base.mjs";
import { t as PhantomWalletAdapter } from "../_libs/solana__wallet-adapter-phantom.mjs";
import { t as SolflareWalletAdapter } from "../_libs/@solana/wallet-adapter-solflare+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/WalletProvider-B0MXIGoG.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
/**
* Wallet provider — mounts client-only because @solana/wallet-adapter-* touches
* window/localStorage. During SSR we render children inside a "bare" shell so
* useWallet() returns the default disconnected state.
*/
function NuminaWalletProvider({ children }) {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const network = WalletAdapterNetwork.Devnet;
	const endpoint = (0, import_react.useMemo)(() => clusterApiUrl(network), [network]);
	const wallets = (0, import_react.useMemo)(() => [new PhantomWalletAdapter(), new SolflareWalletAdapter({ network })], [network]);
	if (!mounted) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ConnectionProvider, {
		endpoint,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalletProvider, {
			wallets,
			autoConnect: true,
			children
		})
	});
}
/** Safe wrapper around useWallet that returns a default shape during SSR. */
function useNuminaWallet() {
	const [mounted, setMounted] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => setMounted(true), []);
	const w = useWallet();
	const connect = (0, import_react.useCallback)(async () => {
		if (!mounted) return;
		try {
			const target = w.wallets.find((x) => x.adapter.name === "Phantom" && x.readyState !== "Unsupported") ?? w.wallets.find((x) => x.readyState !== "Unsupported");
			if (!target) {
				toast.error("No wallet detected", { description: "Install Phantom to bind a vessel." });
				window.open("https://phantom.app/", "_blank", "noopener,noreferrer");
				return;
			}
			w.select(target.adapter.name);
			await w.connect();
			toast.success("Vessel bound", { description: `Connected via ${target.adapter.name}.` });
		} catch (err) {
			console.error("Wallet connect failed", err);
			const msg = err instanceof Error ? err.message : "Unknown error";
			toast.error("The gate refused", { description: msg });
		}
	}, [w, mounted]);
	if (!mounted) return {
		mounted: false,
		publicKey: null,
		connecting: false,
		connected: false,
		walletName: null,
		connect,
		disconnect: async () => {}
	};
	return {
		mounted,
		publicKey: w.publicKey ? w.publicKey.toBase58() : null,
		connecting: w.connecting,
		connected: w.connected,
		walletName: w.wallet?.adapter.name ?? null,
		connect,
		disconnect: async () => {
			try {
				await w.disconnect();
				toast("Binding severed");
			} catch (err) {
				const msg = err instanceof Error ? err.message : "Unknown error";
				toast.error("Could not sever", { description: msg });
			}
		}
	};
}
function shortAddress(addr) {
	if (!addr) return "";
	return `${addr.slice(0, 4)}…${addr.slice(-4)}`;
}
//#endregion
export { shortAddress as n, useNuminaWallet as r, NuminaWalletProvider as t };
