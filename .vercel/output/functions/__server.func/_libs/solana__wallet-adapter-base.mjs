import "./@solana-mobile/wallet-adapter-mobile.mjs";
//#region node_modules/@solana/wallet-adapter-base/lib/esm/standard.js
function isWalletAdapterCompatibleStandardWallet(wallet) {
	return "standard:connect" in wallet.features && "standard:events" in wallet.features && ("solana:signAndSendTransaction" in wallet.features || "solana:signTransaction" in wallet.features);
}
//#endregion
//#region node_modules/@solana/wallet-adapter-base/lib/esm/types.js
var WalletAdapterNetwork;
(function(WalletAdapterNetwork) {
	WalletAdapterNetwork["Mainnet"] = "mainnet-beta";
	WalletAdapterNetwork["Testnet"] = "testnet";
	WalletAdapterNetwork["Devnet"] = "devnet";
})(WalletAdapterNetwork || (WalletAdapterNetwork = {}));
//#endregion
export { isWalletAdapterCompatibleStandardWallet as n, WalletAdapterNetwork as t };
