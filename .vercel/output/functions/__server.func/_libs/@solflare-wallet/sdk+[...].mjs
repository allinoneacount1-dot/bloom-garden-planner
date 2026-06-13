import { i as __require, o as __toESM, r as __exportAll, t as __commonJSMin } from "../../_runtime.mjs";
import { B as VersionedTransaction, H as eventemitter3_default, R as PublicKey, z as Transaction } from "../@solana-mobile/wallet-adapter-mobile.mjs";
//#region node_modules/@solflare-wallet/sdk/lib/esm/adapters/base.js
var __extends$4 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var WalletAdapter = function(_super) {
	__extends$4(WalletAdapter, _super);
	function WalletAdapter() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return WalletAdapter;
}(eventemitter3_default);
//#endregion
//#region node_modules/@solflare-wallet/sdk/node_modules/base-x/src/index.js
var require_src = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	function base(ALPHABET) {
		if (ALPHABET.length >= 255) throw new TypeError("Alphabet too long");
		var BASE_MAP = new Uint8Array(256);
		for (var j = 0; j < BASE_MAP.length; j++) BASE_MAP[j] = 255;
		for (var i = 0; i < ALPHABET.length; i++) {
			var x = ALPHABET.charAt(i);
			var xc = x.charCodeAt(0);
			if (BASE_MAP[xc] !== 255) throw new TypeError(x + " is ambiguous");
			BASE_MAP[xc] = i;
		}
		var BASE = ALPHABET.length;
		var LEADER = ALPHABET.charAt(0);
		var FACTOR = Math.log(BASE) / Math.log(256);
		var iFACTOR = Math.log(256) / Math.log(BASE);
		function encode(source) {
			if (source instanceof Uint8Array) {} else if (ArrayBuffer.isView(source)) source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
			else if (Array.isArray(source)) source = Uint8Array.from(source);
			if (!(source instanceof Uint8Array)) throw new TypeError("Expected Uint8Array");
			if (source.length === 0) return "";
			var zeroes = 0;
			var length = 0;
			var pbegin = 0;
			var pend = source.length;
			while (pbegin !== pend && source[pbegin] === 0) {
				pbegin++;
				zeroes++;
			}
			var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
			var b58 = new Uint8Array(size);
			while (pbegin !== pend) {
				var carry = source[pbegin];
				var i = 0;
				for (var it1 = size - 1; (carry !== 0 || i < length) && it1 !== -1; it1--, i++) {
					carry += 256 * b58[it1] >>> 0;
					b58[it1] = carry % BASE >>> 0;
					carry = carry / BASE >>> 0;
				}
				if (carry !== 0) throw new Error("Non-zero carry");
				length = i;
				pbegin++;
			}
			var it2 = size - length;
			while (it2 !== size && b58[it2] === 0) it2++;
			var str = LEADER.repeat(zeroes);
			for (; it2 < size; ++it2) str += ALPHABET.charAt(b58[it2]);
			return str;
		}
		function decodeUnsafe(source) {
			if (typeof source !== "string") throw new TypeError("Expected String");
			if (source.length === 0) return new Uint8Array();
			var psz = 0;
			var zeroes = 0;
			var length = 0;
			while (source[psz] === LEADER) {
				zeroes++;
				psz++;
			}
			var size = (source.length - psz) * FACTOR + 1 >>> 0;
			var b256 = new Uint8Array(size);
			while (source[psz]) {
				var charCode = source.charCodeAt(psz);
				if (charCode > 255) return;
				var carry = BASE_MAP[charCode];
				if (carry === 255) return;
				var i = 0;
				for (var it3 = size - 1; (carry !== 0 || i < length) && it3 !== -1; it3--, i++) {
					carry += BASE * b256[it3] >>> 0;
					b256[it3] = carry % 256 >>> 0;
					carry = carry / 256 >>> 0;
				}
				if (carry !== 0) throw new Error("Non-zero carry");
				length = i;
				psz++;
			}
			var it4 = size - length;
			while (it4 !== size && b256[it4] === 0) it4++;
			var vch = new Uint8Array(zeroes + (size - it4));
			var j = zeroes;
			while (it4 !== size) vch[j++] = b256[it4++];
			return vch;
		}
		function decode(string) {
			var buffer = decodeUnsafe(string);
			if (buffer) return buffer;
			throw new Error("Non-base" + BASE + " character");
		}
		return {
			encode,
			decodeUnsafe,
			decode
		};
	}
	module.exports = base;
}));
//#endregion
//#region node_modules/@solflare-wallet/sdk/lib/esm/adapters/WalletProvider.js
var import_bs58 = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	module.exports = require_src()("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");
})))());
var __extends$3 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __assign$2 = function() {
	__assign$2 = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign$2.apply(this, arguments);
};
var __awaiter$3 = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator$3 = function(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g;
	return g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
};
var __read = function(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
};
var Wallet = function(_super) {
	__extends$3(Wallet, _super);
	function Wallet(provider, network) {
		var _this = _super.call(this) || this;
		_this._handleMessage = function(e) {
			if (_this._injectedProvider && e.source === window || e.origin === _this._providerUrl.origin && e.source === _this._popup) {
				if (e.data.method === "connected") {
					var newPublicKey = new PublicKey(e.data.params.publicKey);
					if (!_this._publicKey || !_this._publicKey.equals(newPublicKey)) {
						if (_this._publicKey && !_this._publicKey.equals(newPublicKey)) _this._handleDisconnect();
						_this._publicKey = newPublicKey;
						_this._autoApprove = !!e.data.params.autoApprove;
						_this.emit("connect", _this._publicKey);
					}
				} else if (e.data.method === "disconnected") _this._handleDisconnect();
				else if (e.data.result || e.data.error) {
					if (_this._responsePromises.has(e.data.id)) {
						var _a = __read(_this._responsePromises.get(e.data.id), 2), resolve = _a[0], reject = _a[1];
						if (e.data.result) resolve(e.data.result);
						else reject(new Error(e.data.error));
					}
				}
			}
		};
		_this._handleConnect = function() {
			if (!_this._handlerAdded) {
				_this._handlerAdded = true;
				window.addEventListener("message", _this._handleMessage);
				window.addEventListener("beforeunload", _this.disconnect);
			}
			if (_this._injectedProvider) return new Promise(function(resolve) {
				_this._sendRequest("connect", {});
				resolve();
			});
			else {
				window.name = "parent";
				_this._popup = window.open(_this._providerUrl.toString(), "_blank", "location,resizable,width=460,height=675");
				return new Promise(function(resolve) {
					_this.once("connect", resolve);
				});
			}
		};
		_this._handleDisconnect = function() {
			if (_this._handlerAdded) {
				_this._handlerAdded = false;
				window.removeEventListener("message", _this._handleMessage);
				window.removeEventListener("beforeunload", _this.disconnect);
			}
			if (_this._publicKey) {
				_this._publicKey = null;
				_this.emit("disconnect");
			}
			_this._responsePromises.forEach(function(_a, id) {
				var _b = __read(_a, 2);
				_b[0];
				var reject = _b[1];
				_this._responsePromises.delete(id);
				reject("Wallet disconnected");
			});
		};
		_this._sendRequest = function(method, params) {
			return __awaiter$3(_this, void 0, void 0, function() {
				var requestId;
				var _this = this;
				return __generator$3(this, function(_a) {
					if (method !== "connect" && !this.connected) throw new Error("Wallet not connected");
					requestId = this._nextRequestId;
					++this._nextRequestId;
					return [2, new Promise(function(resolve, reject) {
						_this._responsePromises.set(requestId, [resolve, reject]);
						if (_this._injectedProvider) _this._injectedProvider.postMessage({
							jsonrpc: "2.0",
							id: requestId,
							method,
							params: __assign$2({ network: _this._network }, params)
						});
						else {
							_this._popup.postMessage({
								jsonrpc: "2.0",
								id: requestId,
								method,
								params
							}, _this._providerUrl.origin);
							if (!_this.autoApprove) _this._popup.focus();
						}
					})];
				});
			});
		};
		_this.connect = function() {
			if (_this._popup) _this._popup.close();
			return _this._handleConnect();
		};
		_this.disconnect = function() {
			return __awaiter$3(_this, void 0, void 0, function() {
				return __generator$3(this, function(_a) {
					switch (_a.label) {
						case 0:
							if (!this._injectedProvider) return [3, 2];
							return [4, this._sendRequest("disconnect", {})];
						case 1:
							_a.sent();
							_a.label = 2;
						case 2:
							if (this._popup) this._popup.close();
							this._handleDisconnect();
							return [2];
					}
				});
			});
		};
		_this.sign = function(data, display) {
			return __awaiter$3(_this, void 0, void 0, function() {
				var response, signature, publicKey;
				return __generator$3(this, function(_a) {
					switch (_a.label) {
						case 0:
							if (!(data instanceof Uint8Array)) throw new Error("Data must be an instance of Uint8Array");
							return [4, this._sendRequest("sign", {
								data,
								display
							})];
						case 1:
							response = _a.sent();
							signature = import_bs58.default.decode(response.signature);
							publicKey = new PublicKey(response.publicKey);
							return [2, {
								signature,
								publicKey
							}];
					}
				});
			});
		};
		if (isInjectedProvider(provider)) _this._injectedProvider = provider;
		else if (isString(provider)) {
			_this._providerUrl = new URL(provider);
			_this._providerUrl.hash = new URLSearchParams({
				origin: window.location.origin,
				network
			}).toString();
		} else throw new Error("provider parameter must be an injected provider or a URL string.");
		_this._network = network;
		_this._publicKey = null;
		_this._autoApprove = false;
		_this._popup = null;
		_this._handlerAdded = false;
		_this._nextRequestId = 1;
		_this._responsePromises = /* @__PURE__ */ new Map();
		return _this;
	}
	Object.defineProperty(Wallet.prototype, "publicKey", {
		get: function() {
			return this._publicKey;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Wallet.prototype, "connected", {
		get: function() {
			return this._publicKey !== null;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Wallet.prototype, "autoApprove", {
		get: function() {
			return this._autoApprove;
		},
		enumerable: false,
		configurable: true
	});
	return Wallet;
}(eventemitter3_default);
function isString(a) {
	return typeof a === "string";
}
function isInjectedProvider(a) {
	return isObject(a) && isFunction(a.postMessage);
}
function isObject(a) {
	return typeof a === "object" && a !== null;
}
function isFunction(a) {
	return typeof a === "function";
}
//#endregion
//#region node_modules/@solflare-wallet/sdk/lib/esm/adapters/web.js
var __extends$2 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __awaiter$2 = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator$2 = function(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g;
	return g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
};
var WebAdapter = function(_super) {
	__extends$2(WebAdapter, _super);
	function WebAdapter(iframe, network, provider) {
		var _this = _super.call(this) || this;
		_this._instance = null;
		_this.handleMessage = function(data) {};
		_this._sendRequest = function(method, params) {
			return __awaiter$2(_this, void 0, void 0, function() {
				var _a, _b;
				return __generator$2(this, function(_c) {
					switch (_c.label) {
						case 0:
							if (!((_a = this._instance) === null || _a === void 0 ? void 0 : _a.sendRequest)) return [3, 2];
							return [4, this._instance.sendRequest(method, params)];
						case 1: return [2, _c.sent()];
						case 2:
							if (!((_b = this._instance) === null || _b === void 0 ? void 0 : _b._sendRequest)) return [3, 4];
							return [4, this._instance._sendRequest(method, params)];
						case 3: return [2, _c.sent()];
						case 4: throw new Error("Unsupported version of `@project-serum/sol-wallet-adapter`");
					}
				});
			});
		};
		_this._handleConnect = function() {
			_this.emit("connect");
		};
		_this._handleDisconnect = function() {
			window.clearInterval(_this._pollTimer);
			_this.emit("disconnect");
		};
		_this._network = network;
		_this._provider = provider;
		return _this;
	}
	Object.defineProperty(WebAdapter.prototype, "publicKey", {
		get: function() {
			return this._instance.publicKey || null;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(WebAdapter.prototype, "connected", {
		get: function() {
			return this._instance.connected || false;
		},
		enumerable: false,
		configurable: true
	});
	WebAdapter.prototype.connect = function() {
		return __awaiter$2(this, void 0, void 0, function() {
			var _this = this;
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						this._instance = new Wallet(this._provider, this._network);
						this._instance.on("connect", this._handleConnect);
						this._instance.on("disconnect", this._handleDisconnect);
						this._pollTimer = window.setInterval(function() {
							var _a, _b;
							if (((_b = (_a = _this._instance) === null || _a === void 0 ? void 0 : _a._popup) === null || _b === void 0 ? void 0 : _b.closed) !== false) _this._handleDisconnect();
						}, 200);
						return [4, this._instance.connect()];
					case 1:
						_a.sent();
						return [2];
				}
			});
		});
	};
	WebAdapter.prototype.disconnect = function() {
		return __awaiter$2(this, void 0, void 0, function() {
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						this._instance.removeAllListeners("connect");
						this._instance.removeAllListeners("disconnect");
						return [4, this._instance.disconnect()];
					case 1:
						_a.sent();
						return [2];
				}
			});
		});
	};
	WebAdapter.prototype.signTransaction = function(transaction) {
		return __awaiter$2(this, void 0, void 0, function() {
			var signedTransaction;
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						return [4, this._sendRequest("signTransactionV2", { transaction: import_bs58.default.encode(transaction) })];
					case 1:
						signedTransaction = _a.sent().transaction;
						return [2, import_bs58.default.decode(signedTransaction)];
				}
			});
		});
	};
	WebAdapter.prototype.signAllTransactions = function(transactions) {
		return __awaiter$2(this, void 0, void 0, function() {
			var signedTransactions;
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						return [4, this._sendRequest("signAllTransactionsV2", { transactions: transactions.map(function(transaction) {
							return import_bs58.default.encode(transaction);
						}) })];
					case 1:
						signedTransactions = _a.sent().transactions;
						return [2, signedTransactions.map(function(transaction) {
							return import_bs58.default.decode(transaction);
						})];
				}
			});
		});
	};
	WebAdapter.prototype.signAndSendTransaction = function(transaction, options) {
		return __awaiter$2(this, void 0, void 0, function() {
			var response;
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						return [4, this._sendRequest("signAndSendTransaction", {
							transaction: import_bs58.default.encode(transaction),
							options
						})];
					case 1:
						response = _a.sent();
						return [2, response.signature];
				}
			});
		});
	};
	WebAdapter.prototype.signMessage = function(data, display) {
		if (display === void 0) display = "hex";
		return __awaiter$2(this, void 0, void 0, function() {
			var signature;
			return __generator$2(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						return [4, this._instance.sign(data, display)];
					case 1:
						signature = _a.sent().signature;
						return [2, Uint8Array.from(signature)];
				}
			});
		});
	};
	return WebAdapter;
}(WalletAdapter);
//#endregion
//#region node_modules/uuid/dist/rng.js
var require_rng = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = rng;
	var _crypto$3 = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var rnds8Pool = new Uint8Array(256);
	var poolPtr = rnds8Pool.length;
	function rng() {
		if (poolPtr > rnds8Pool.length - 16) {
			_crypto$3.default.randomFillSync(rnds8Pool);
			poolPtr = 0;
		}
		return rnds8Pool.slice(poolPtr, poolPtr += 16);
	}
}));
//#endregion
//#region node_modules/uuid/dist/regex.js
var require_regex = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
}));
//#endregion
//#region node_modules/uuid/dist/validate.js
var require_validate = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _regex = _interopRequireDefault(require_regex());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function validate(uuid) {
		return typeof uuid === "string" && _regex.default.test(uuid);
	}
	exports.default = validate;
}));
//#endregion
//#region node_modules/uuid/dist/stringify.js
var require_stringify = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.unsafeStringify = unsafeStringify;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	/**
	* Convert array of 16 byte values to UUID string format of the form:
	* XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
	*/
	var byteToHex = [];
	for (let i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).slice(1));
	function unsafeStringify(arr, offset = 0) {
		return byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]];
	}
	function stringify(arr, offset = 0) {
		const uuid = unsafeStringify(arr, offset);
		if (!(0, _validate.default)(uuid)) throw TypeError("Stringified UUID is invalid");
		return uuid;
	}
	exports.default = stringify;
}));
//#endregion
//#region node_modules/uuid/dist/v1.js
var require_v1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _rng = _interopRequireDefault(require_rng());
	var _stringify = require_stringify();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	var _nodeId;
	var _clockseq;
	var _lastMSecs = 0;
	var _lastNSecs = 0;
	function v1(options, buf, offset) {
		let i = buf && offset || 0;
		const b = buf || new Array(16);
		options = options || {};
		let node = options.node || _nodeId;
		let clockseq = options.clockseq !== void 0 ? options.clockseq : _clockseq;
		if (node == null || clockseq == null) {
			const seedBytes = options.random || (options.rng || _rng.default)();
			if (node == null) node = _nodeId = [
				seedBytes[0] | 1,
				seedBytes[1],
				seedBytes[2],
				seedBytes[3],
				seedBytes[4],
				seedBytes[5]
			];
			if (clockseq == null) clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 16383;
		}
		let msecs = options.msecs !== void 0 ? options.msecs : Date.now();
		let nsecs = options.nsecs !== void 0 ? options.nsecs : _lastNSecs + 1;
		const dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 1e4;
		if (dt < 0 && options.clockseq === void 0) clockseq = clockseq + 1 & 16383;
		if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === void 0) nsecs = 0;
		if (nsecs >= 1e4) throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
		_lastMSecs = msecs;
		_lastNSecs = nsecs;
		_clockseq = clockseq;
		msecs += 0xb1d069b5400;
		const tl = ((msecs & 268435455) * 1e4 + nsecs) % 4294967296;
		b[i++] = tl >>> 24 & 255;
		b[i++] = tl >>> 16 & 255;
		b[i++] = tl >>> 8 & 255;
		b[i++] = tl & 255;
		const tmh = msecs / 4294967296 * 1e4 & 268435455;
		b[i++] = tmh >>> 8 & 255;
		b[i++] = tmh & 255;
		b[i++] = tmh >>> 24 & 15 | 16;
		b[i++] = tmh >>> 16 & 255;
		b[i++] = clockseq >>> 8 | 128;
		b[i++] = clockseq & 255;
		for (let n = 0; n < 6; ++n) b[i + n] = node[n];
		return buf || (0, _stringify.unsafeStringify)(b);
	}
	exports.default = v1;
}));
//#endregion
//#region node_modules/uuid/dist/parse.js
var require_parse = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function parse(uuid) {
		if (!(0, _validate.default)(uuid)) throw TypeError("Invalid UUID");
		let v;
		const arr = new Uint8Array(16);
		arr[0] = (v = parseInt(uuid.slice(0, 8), 16)) >>> 24;
		arr[1] = v >>> 16 & 255;
		arr[2] = v >>> 8 & 255;
		arr[3] = v & 255;
		arr[4] = (v = parseInt(uuid.slice(9, 13), 16)) >>> 8;
		arr[5] = v & 255;
		arr[6] = (v = parseInt(uuid.slice(14, 18), 16)) >>> 8;
		arr[7] = v & 255;
		arr[8] = (v = parseInt(uuid.slice(19, 23), 16)) >>> 8;
		arr[9] = v & 255;
		arr[10] = (v = parseInt(uuid.slice(24, 36), 16)) / 1099511627776 & 255;
		arr[11] = v / 4294967296 & 255;
		arr[12] = v >>> 24 & 255;
		arr[13] = v >>> 16 & 255;
		arr[14] = v >>> 8 & 255;
		arr[15] = v & 255;
		return arr;
	}
	exports.default = parse;
}));
//#endregion
//#region node_modules/uuid/dist/v35.js
var require_v35 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.URL = exports.DNS = void 0;
	exports.default = v35;
	var _stringify = require_stringify();
	var _parse = _interopRequireDefault(require_parse());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function stringToBytes(str) {
		str = unescape(encodeURIComponent(str));
		const bytes = [];
		for (let i = 0; i < str.length; ++i) bytes.push(str.charCodeAt(i));
		return bytes;
	}
	var DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8";
	exports.DNS = DNS;
	var URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8";
	exports.URL = URL;
	function v35(name, version, hashfunc) {
		function generateUUID(value, namespace, buf, offset) {
			var _namespace;
			if (typeof value === "string") value = stringToBytes(value);
			if (typeof namespace === "string") namespace = (0, _parse.default)(namespace);
			if (((_namespace = namespace) === null || _namespace === void 0 ? void 0 : _namespace.length) !== 16) throw TypeError("Namespace must be array-like (16 iterable integer values, 0-255)");
			let bytes = new Uint8Array(16 + value.length);
			bytes.set(namespace);
			bytes.set(value, namespace.length);
			bytes = hashfunc(bytes);
			bytes[6] = bytes[6] & 15 | version;
			bytes[8] = bytes[8] & 63 | 128;
			if (buf) {
				offset = offset || 0;
				for (let i = 0; i < 16; ++i) buf[offset + i] = bytes[i];
				return buf;
			}
			return (0, _stringify.unsafeStringify)(bytes);
		}
		try {
			generateUUID.name = name;
		} catch (err) {}
		generateUUID.DNS = DNS;
		generateUUID.URL = URL;
		return generateUUID;
	}
}));
//#endregion
//#region node_modules/uuid/dist/md5.js
var require_md5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _crypto$2 = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function md5(bytes) {
		if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
		else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
		return _crypto$2.default.createHash("md5").update(bytes).digest();
	}
	exports.default = md5;
}));
//#endregion
//#region node_modules/uuid/dist/v3.js
var require_v3 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _v = _interopRequireDefault(require_v35());
	var _md = _interopRequireDefault(require_md5());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports.default = (0, _v.default)("v3", 48, _md.default);
}));
//#endregion
//#region node_modules/uuid/dist/native.js
var require_native = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _crypto$1 = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports.default = { randomUUID: _crypto$1.default.randomUUID };
}));
//#endregion
//#region node_modules/uuid/dist/v4.js
var require_v4 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _native = _interopRequireDefault(require_native());
	var _rng = _interopRequireDefault(require_rng());
	var _stringify = require_stringify();
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function v4(options, buf, offset) {
		if (_native.default.randomUUID && !buf && !options) return _native.default.randomUUID();
		options = options || {};
		const rnds = options.random || (options.rng || _rng.default)();
		rnds[6] = rnds[6] & 15 | 64;
		rnds[8] = rnds[8] & 63 | 128;
		if (buf) {
			offset = offset || 0;
			for (let i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
			return buf;
		}
		return (0, _stringify.unsafeStringify)(rnds);
	}
	exports.default = v4;
}));
//#endregion
//#region node_modules/uuid/dist/sha1.js
var require_sha1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _crypto = _interopRequireDefault(__require("crypto"));
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function sha1(bytes) {
		if (Array.isArray(bytes)) bytes = Buffer.from(bytes);
		else if (typeof bytes === "string") bytes = Buffer.from(bytes, "utf8");
		return _crypto.default.createHash("sha1").update(bytes).digest();
	}
	exports.default = sha1;
}));
//#endregion
//#region node_modules/uuid/dist/v5.js
var require_v5 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _v = _interopRequireDefault(require_v35());
	var _sha = _interopRequireDefault(require_sha1());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	exports.default = (0, _v.default)("v5", 80, _sha.default);
}));
//#endregion
//#region node_modules/uuid/dist/nil.js
var require_nil = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	exports.default = "00000000-0000-0000-0000-000000000000";
}));
//#endregion
//#region node_modules/uuid/dist/version.js
var require_version = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = void 0;
	var _validate = _interopRequireDefault(require_validate());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	function version(uuid) {
		if (!(0, _validate.default)(uuid)) throw TypeError("Invalid UUID");
		return parseInt(uuid.slice(14, 15), 16);
	}
	exports.default = version;
}));
//#endregion
//#region node_modules/uuid/wrapper.mjs
var import_dist = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "NIL", {
		enumerable: true,
		get: function() {
			return _nil.default;
		}
	});
	Object.defineProperty(exports, "parse", {
		enumerable: true,
		get: function() {
			return _parse.default;
		}
	});
	Object.defineProperty(exports, "stringify", {
		enumerable: true,
		get: function() {
			return _stringify.default;
		}
	});
	Object.defineProperty(exports, "v1", {
		enumerable: true,
		get: function() {
			return _v.default;
		}
	});
	Object.defineProperty(exports, "v3", {
		enumerable: true,
		get: function() {
			return _v2.default;
		}
	});
	Object.defineProperty(exports, "v4", {
		enumerable: true,
		get: function() {
			return _v3.default;
		}
	});
	Object.defineProperty(exports, "v5", {
		enumerable: true,
		get: function() {
			return _v4.default;
		}
	});
	Object.defineProperty(exports, "validate", {
		enumerable: true,
		get: function() {
			return _validate.default;
		}
	});
	Object.defineProperty(exports, "version", {
		enumerable: true,
		get: function() {
			return _version.default;
		}
	});
	var _v = _interopRequireDefault(require_v1());
	var _v2 = _interopRequireDefault(require_v3());
	var _v3 = _interopRequireDefault(require_v4());
	var _v4 = _interopRequireDefault(require_v5());
	var _nil = _interopRequireDefault(require_nil());
	var _version = _interopRequireDefault(require_version());
	var _validate = _interopRequireDefault(require_validate());
	var _stringify = _interopRequireDefault(require_stringify());
	var _parse = _interopRequireDefault(require_parse());
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
})))(), 1);
import_dist.default.v1;
import_dist.default.v3;
var v4 = import_dist.default.v4;
import_dist.default.v5;
import_dist.default.NIL;
import_dist.default.version;
import_dist.default.validate;
import_dist.default.stringify;
import_dist.default.parse;
//#endregion
//#region node_modules/@solflare-wallet/sdk/lib/esm/adapters/iframe.js
var __extends$1 = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __assign$1 = function() {
	__assign$1 = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign$1.apply(this, arguments);
};
var __awaiter$1 = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator$1 = function(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g;
	return g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
};
var IframeAdapter = function(_super) {
	__extends$1(IframeAdapter, _super);
	function IframeAdapter(iframe, publicKey) {
		var _this = this;
		var _a;
		_this = _super.call(this) || this;
		_this._publicKey = null;
		_this._messageHandlers = {};
		_this.handleMessage = function(data) {
			if (_this._messageHandlers[data.id]) {
				var _a = _this._messageHandlers[data.id], resolve = _a.resolve, reject = _a.reject;
				delete _this._messageHandlers[data.id];
				if (data.error) reject(data.error);
				else resolve(data.result);
			}
		};
		_this._sendMessage = function(data) {
			if (!_this.connected) throw new Error("Wallet not connected");
			return new Promise(function(resolve, reject) {
				var _a, _b;
				var messageId = v4();
				_this._messageHandlers[messageId] = {
					resolve,
					reject
				};
				(_b = (_a = _this._iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 || _b.postMessage({
					channel: "solflareWalletAdapterToIframe",
					data: __assign$1({ id: messageId }, data)
				}, "*");
			});
		};
		_this._iframe = iframe;
		_this._publicKey = new PublicKey((_a = publicKey === null || publicKey === void 0 ? void 0 : publicKey.toString) === null || _a === void 0 ? void 0 : _a.call(publicKey));
		return _this;
	}
	Object.defineProperty(IframeAdapter.prototype, "publicKey", {
		get: function() {
			return this._publicKey || null;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(IframeAdapter.prototype, "connected", {
		get: function() {
			return true;
		},
		enumerable: false,
		configurable: true
	});
	IframeAdapter.prototype.connect = function() {
		return __awaiter$1(this, void 0, void 0, function() {
			return __generator$1(this, function(_a) {
				return [2];
			});
		});
	};
	IframeAdapter.prototype.disconnect = function() {
		return __awaiter$1(this, void 0, void 0, function() {
			return __generator$1(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this._sendMessage({ method: "disconnect" })];
					case 1:
						_a.sent();
						return [2];
				}
			});
		});
	};
	IframeAdapter.prototype.signTransaction = function(transaction) {
		var _a;
		return __awaiter$1(this, void 0, void 0, function() {
			var signedTransaction, e_1;
			return __generator$1(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						_b.label = 1;
					case 1:
						_b.trys.push([
							1,
							3,
							,
							4
						]);
						return [4, this._sendMessage({
							method: "signTransaction",
							params: { transaction: import_bs58.default.encode(transaction) }
						})];
					case 2:
						signedTransaction = _b.sent();
						return [2, import_bs58.default.decode(signedTransaction)];
					case 3:
						e_1 = _b.sent();
						throw new Error(((_a = e_1 === null || e_1 === void 0 ? void 0 : e_1.toString) === null || _a === void 0 ? void 0 : _a.call(e_1)) || "Failed to sign transaction");
					case 4: return [2];
				}
			});
		});
	};
	IframeAdapter.prototype.signAllTransactions = function(transactions) {
		var _a;
		return __awaiter$1(this, void 0, void 0, function() {
			var signedTransactions, e_2;
			return __generator$1(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						_b.label = 1;
					case 1:
						_b.trys.push([
							1,
							3,
							,
							4
						]);
						return [4, this._sendMessage({
							method: "signAllTransactions",
							params: { transactions: transactions.map(function(transaction) {
								return import_bs58.default.encode(transaction);
							}) }
						})];
					case 2:
						signedTransactions = _b.sent();
						return [2, signedTransactions.map(function(transaction) {
							return import_bs58.default.decode(transaction);
						})];
					case 3:
						e_2 = _b.sent();
						throw new Error(((_a = e_2 === null || e_2 === void 0 ? void 0 : e_2.toString) === null || _a === void 0 ? void 0 : _a.call(e_2)) || "Failed to sign transactions");
					case 4: return [2];
				}
			});
		});
	};
	IframeAdapter.prototype.signAndSendTransaction = function(transaction, options) {
		var _a;
		return __awaiter$1(this, void 0, void 0, function() {
			var result, e_3;
			return __generator$1(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						_b.label = 1;
					case 1:
						_b.trys.push([
							1,
							3,
							,
							4
						]);
						return [4, this._sendMessage({
							method: "signAndSendTransaction",
							params: {
								transaction: import_bs58.default.encode(transaction),
								options
							}
						})];
					case 2:
						result = _b.sent();
						return [2, result];
					case 3:
						e_3 = _b.sent();
						throw new Error(((_a = e_3 === null || e_3 === void 0 ? void 0 : e_3.toString) === null || _a === void 0 ? void 0 : _a.call(e_3)) || "Failed to sign and send transaction");
					case 4: return [2];
				}
			});
		});
	};
	IframeAdapter.prototype.signMessage = function(data, display) {
		var _a;
		if (display === void 0) display = "hex";
		return __awaiter$1(this, void 0, void 0, function() {
			var result, e_4;
			return __generator$1(this, function(_b) {
				switch (_b.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						_b.label = 1;
					case 1:
						_b.trys.push([
							1,
							3,
							,
							4
						]);
						return [4, this._sendMessage({
							method: "signMessage",
							params: {
								data,
								display
							}
						})];
					case 2:
						result = _b.sent();
						return [2, Uint8Array.from(import_bs58.default.decode(result))];
					case 3:
						e_4 = _b.sent();
						throw new Error(((_a = e_4 === null || e_4 === void 0 ? void 0 : e_4.toString) === null || _a === void 0 ? void 0 : _a.call(e_4)) || "Failed to sign message");
					case 4: return [2];
				}
			});
		});
	};
	return IframeAdapter;
}(WalletAdapter);
//#endregion
//#region node_modules/@solflare-wallet/sdk/lib/esm/utils.js
function isLegacyTransactionInstance(transaction) {
	return transaction.version === void 0;
}
//#endregion
//#region node_modules/@solflare-wallet/sdk/lib/esm/index.js
var esm_exports = /* @__PURE__ */ __exportAll({ default: () => Solflare });
var __extends = (function() {
	var extendStatics = function(d, b) {
		extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
			d.__proto__ = b;
		} || function(d, b) {
			for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
		};
		return extendStatics(d, b);
	};
	return function(d, b) {
		if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
		extendStatics(d, b);
		function __() {
			this.constructor = d;
		}
		d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
})();
var __assign = function() {
	__assign = Object.assign || function(t) {
		for (var s, i = 1, n = arguments.length; i < n; i++) {
			s = arguments[i];
			for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
		}
		return t;
	};
	return __assign.apply(this, arguments);
};
var __awaiter = function(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
var __generator = function(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g;
	return g = {
		next: verb(0),
		"throw": verb(1),
		"return": verb(2)
	}, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
};
var __values = function(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Solflare = function(_super) {
	__extends(Solflare, _super);
	function Solflare(config) {
		var _this = _super.call(this) || this;
		_this._network = "mainnet-beta";
		_this._provider = null;
		_this._iframeParams = {};
		_this._adapterInstance = null;
		_this._element = null;
		_this._iframe = null;
		_this._connectHandler = null;
		_this._flutterHandlerInterval = null;
		_this._handleEvent = function(event) {
			var _a, _b, _c, _d;
			switch (event.type) {
				case "connect_native_web":
					_this._collapseIframe();
					_this._adapterInstance = new WebAdapter(_this._iframe, _this._network, ((_a = event.data) === null || _a === void 0 ? void 0 : _a.provider) || _this._provider || "https://solflare.com/provider");
					_this._adapterInstance.on("connect", _this._webConnected);
					_this._adapterInstance.on("disconnect", _this._webDisconnected);
					_this._adapterInstance.connect();
					_this._setPreferredAdapter("native_web");
					return;
				case "connect":
					_this._collapseIframe();
					_this._adapterInstance = new IframeAdapter(_this._iframe, ((_b = event.data) === null || _b === void 0 ? void 0 : _b.publicKey) || "");
					_this._adapterInstance.connect();
					_this._setPreferredAdapter((_c = event.data) === null || _c === void 0 ? void 0 : _c.adapter);
					if (_this._connectHandler) {
						_this._connectHandler.resolve();
						_this._connectHandler = null;
					}
					_this.emit("connect", _this.publicKey);
					return;
				case "disconnect":
					if (_this._connectHandler) {
						_this._connectHandler.reject();
						_this._connectHandler = null;
					}
					_this._disconnected();
					_this.emit("disconnect");
					return;
				case "accountChanged":
					if ((_d = event.data) === null || _d === void 0 ? void 0 : _d.publicKey) {
						_this._adapterInstance = new IframeAdapter(_this._iframe, event.data.publicKey);
						_this._adapterInstance.connect();
						_this.emit("accountChanged", _this.publicKey);
					} else _this.emit("accountChanged", void 0);
					return;
				case "collapse":
					_this._collapseIframe();
					return;
				default: return;
			}
		};
		_this._handleResize = function(data) {
			if (data.resizeMode === "full") {
				if (data.params.mode === "fullscreen") _this._expandIframe();
				else if (data.params.mode === "hide") _this._collapseIframe();
			} else if (data.resizeMode === "coordinates") {
				if (_this._iframe) {
					_this._iframe.style.top = isFinite(data.params.top) ? "".concat(data.params.top, "px") : "";
					_this._iframe.style.bottom = isFinite(data.params.bottom) ? "".concat(data.params.bottom, "px") : "";
					_this._iframe.style.left = isFinite(data.params.left) ? "".concat(data.params.left, "px") : "";
					_this._iframe.style.right = isFinite(data.params.right) ? "".concat(data.params.right, "px") : "";
					_this._iframe.style.width = isFinite(data.params.width) ? "".concat(data.params.width, "px") : data.params.width;
					_this._iframe.style.height = isFinite(data.params.height) ? "".concat(data.params.height, "px") : data.params.height;
				}
			}
		};
		_this._handleMessage = function(event) {
			var _a;
			if (((_a = event.data) === null || _a === void 0 ? void 0 : _a.channel) !== "solflareIframeToWalletAdapter") return;
			var data = event.data.data || {};
			if (data.type === "event") _this._handleEvent(data.event);
			else if (data.type === "resize") _this._handleResize(data);
			else if (data.type === "response") {
				if (_this._adapterInstance) _this._adapterInstance.handleMessage(data);
			}
		};
		_this._removeElement = function() {
			if (_this._flutterHandlerInterval !== null) {
				clearInterval(_this._flutterHandlerInterval);
				_this._flutterHandlerInterval = null;
			}
			if (_this._element) {
				_this._element.remove();
				_this._element = null;
			}
		};
		_this._removeDanglingElements = function() {
			var e_1, _a;
			var elements = document.getElementsByClassName("solflare-wallet-adapter-iframe");
			try {
				for (var elements_1 = __values(elements), elements_1_1 = elements_1.next(); !elements_1_1.done; elements_1_1 = elements_1.next()) {
					var element = elements_1_1.value;
					if (element.parentElement) element.remove();
				}
			} catch (e_1_1) {
				e_1 = { error: e_1_1 };
			} finally {
				try {
					if (elements_1_1 && !elements_1_1.done && (_a = elements_1.return)) _a.call(elements_1);
				} finally {
					if (e_1) throw e_1.error;
				}
			}
		};
		_this._injectElement = function() {
			_this._removeElement();
			_this._removeDanglingElements();
			var params = __assign(__assign({}, _this._iframeParams), {
				cluster: _this._network || "mainnet-beta",
				origin: window.location.origin || "",
				title: document.title || "",
				version: 1,
				sdkVersion: "1.4.2"
			});
			var preferredAdapter = _this._getPreferredAdapter();
			if (preferredAdapter) params.adapter = preferredAdapter;
			if (_this._provider) params.provider = _this._provider;
			var queryString = Object.keys(params).map(function(key) {
				return "".concat(key, "=").concat(encodeURIComponent(params[key]));
			}).join("&");
			var iframeUrl = "".concat(Solflare.IFRAME_URL, "?").concat(queryString);
			_this._element = document.createElement("div");
			_this._element.className = "solflare-wallet-adapter-iframe";
			_this._element.innerHTML = "\n      <iframe src='".concat(iframeUrl, "' referrerPolicy='strict-origin-when-cross-origin' style='position: fixed; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; border: none; border-radius: 0; z-index: 99999; color-scheme: auto;' allowtransparency='true'></iframe>\n    ");
			document.body.appendChild(_this._element);
			_this._iframe = _this._element.querySelector("iframe");
			window.fromFlutter = _this._handleMobileMessage;
			_this._flutterHandlerInterval = setInterval(function() {
				window.fromFlutter = _this._handleMobileMessage;
			}, 100);
			window.addEventListener("message", _this._handleMessage, false);
		};
		_this._collapseIframe = function() {
			if (_this._iframe) {
				_this._iframe.style.top = "";
				_this._iframe.style.right = "";
				_this._iframe.style.height = "2px";
				_this._iframe.style.width = "2px";
			}
		};
		_this._expandIframe = function() {
			if (_this._iframe) {
				_this._iframe.style.top = "0px";
				_this._iframe.style.bottom = "0px";
				_this._iframe.style.left = "0px";
				_this._iframe.style.right = "0px";
				_this._iframe.style.width = "100%";
				_this._iframe.style.height = "100%";
			}
		};
		_this._getPreferredAdapter = function() {
			if (localStorage) return localStorage.getItem("solflarePreferredWalletAdapter") || null;
			return null;
		};
		_this._setPreferredAdapter = function(adapter) {
			if (localStorage && adapter) localStorage.setItem("solflarePreferredWalletAdapter", adapter);
		};
		_this._clearPreferredAdapter = function() {
			if (localStorage) localStorage.removeItem("solflarePreferredWalletAdapter");
		};
		_this._webConnected = function() {
			if (_this._connectHandler) {
				_this._connectHandler.resolve();
				_this._connectHandler = null;
			}
			_this.emit("connect", _this.publicKey);
		};
		_this._webDisconnected = function() {
			if (_this._connectHandler) {
				_this._connectHandler.reject();
				_this._connectHandler = null;
			}
			_this._disconnected();
			_this.emit("disconnect");
		};
		_this._disconnected = function() {
			window.removeEventListener("message", _this._handleMessage, false);
			_this._removeElement();
			_this._clearPreferredAdapter();
			_this._adapterInstance = null;
		};
		_this._handleMobileMessage = function(data) {
			var _a, _b;
			(_b = (_a = _this._iframe) === null || _a === void 0 ? void 0 : _a.contentWindow) === null || _b === void 0 || _b.postMessage({
				channel: "solflareMobileToIframe",
				data
			}, "*");
		};
		if (config === null || config === void 0 ? void 0 : config.network) _this._network = config === null || config === void 0 ? void 0 : config.network;
		if (config === null || config === void 0 ? void 0 : config.provider) _this._provider = config === null || config === void 0 ? void 0 : config.provider;
		if (config === null || config === void 0 ? void 0 : config.params) _this._iframeParams = __assign({}, config === null || config === void 0 ? void 0 : config.params);
		return _this;
	}
	Object.defineProperty(Solflare.prototype, "publicKey", {
		get: function() {
			var _a;
			return ((_a = this._adapterInstance) === null || _a === void 0 ? void 0 : _a.publicKey) || null;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Solflare.prototype, "isConnected", {
		get: function() {
			var _a;
			return !!((_a = this._adapterInstance) === null || _a === void 0 ? void 0 : _a.connected);
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Solflare.prototype, "connected", {
		get: function() {
			return this.isConnected;
		},
		enumerable: false,
		configurable: true
	});
	Object.defineProperty(Solflare.prototype, "autoApprove", {
		get: function() {
			return false;
		},
		enumerable: false,
		configurable: true
	});
	Solflare.prototype.connect = function() {
		return __awaiter(this, void 0, void 0, function() {
			var _this = this;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (this.connected) return [2];
						this._injectElement();
						return [4, new Promise(function(resolve, reject) {
							_this._connectHandler = {
								resolve,
								reject
							};
						})];
					case 1:
						_a.sent();
						return [2];
				}
			});
		});
	};
	Solflare.prototype.disconnect = function() {
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this._adapterInstance) return [2];
						return [4, this._adapterInstance.disconnect()];
					case 1:
						_a.sent();
						this._disconnected();
						this.emit("disconnect");
						return [2];
				}
			});
		});
	};
	Solflare.prototype.signTransaction = function(transaction) {
		return __awaiter(this, void 0, void 0, function() {
			var serializedTransaction, signedTransaction;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						serializedTransaction = isLegacyTransactionInstance(transaction) ? Uint8Array.from(transaction.serialize({
							verifySignatures: false,
							requireAllSignatures: false
						})) : transaction.serialize();
						return [4, this._adapterInstance.signTransaction(serializedTransaction)];
					case 1:
						signedTransaction = _a.sent();
						return [2, isLegacyTransactionInstance(transaction) ? Transaction.from(signedTransaction) : VersionedTransaction.deserialize(signedTransaction)];
				}
			});
		});
	};
	Solflare.prototype.signAllTransactions = function(transactions) {
		return __awaiter(this, void 0, void 0, function() {
			var serializedTransactions, signedTransactions;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						serializedTransactions = transactions.map(function(transaction) {
							return isLegacyTransactionInstance(transaction) ? Uint8Array.from(transaction.serialize({
								verifySignatures: false,
								requireAllSignatures: false
							})) : transaction.serialize();
						});
						return [4, this._adapterInstance.signAllTransactions(serializedTransactions)];
					case 1:
						signedTransactions = _a.sent();
						if (signedTransactions.length !== transactions.length) throw new Error("Failed to sign all transactions");
						return [2, signedTransactions.map(function(signedTransaction, index) {
							return isLegacyTransactionInstance(transactions[index]) ? Transaction.from(signedTransaction) : VersionedTransaction.deserialize(signedTransaction);
						})];
				}
			});
		});
	};
	Solflare.prototype.signAndSendTransaction = function(transaction, options) {
		return __awaiter(this, void 0, void 0, function() {
			var serializedTransaction;
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						serializedTransaction = isLegacyTransactionInstance(transaction) ? transaction.serialize({
							verifySignatures: false,
							requireAllSignatures: false
						}) : transaction.serialize();
						return [4, this._adapterInstance.signAndSendTransaction(serializedTransaction, options)];
					case 1: return [2, _a.sent()];
				}
			});
		});
	};
	Solflare.prototype.signMessage = function(data, display) {
		if (display === void 0) display = "utf8";
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0:
						if (!this.connected) throw new Error("Wallet not connected");
						return [4, this._adapterInstance.signMessage(data, display)];
					case 1: return [2, _a.sent()];
				}
			});
		});
	};
	Solflare.prototype.sign = function(data, display) {
		if (display === void 0) display = "utf8";
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_a) {
				switch (_a.label) {
					case 0: return [4, this.signMessage(data, display)];
					case 1: return [2, _a.sent()];
				}
			});
		});
	};
	Solflare.prototype.detectWallet = function(timeout) {
		var _a;
		if (timeout === void 0) timeout = 10;
		return __awaiter(this, void 0, void 0, function() {
			return __generator(this, function(_b) {
				if (window.SolflareApp || ((_a = window.solflare) === null || _a === void 0 ? void 0 : _a.isSolflare)) return [2, true];
				return [2, new Promise(function(resolve) {
					var pollInterval = setInterval(function() {
						var _a;
						if (window.SolflareApp || ((_a = window.solflare) === null || _a === void 0 ? void 0 : _a.isSolflare)) {
							clearInterval(pollInterval);
							clearTimeout(pollTimeout);
							resolve(true);
						}
					}, 500), pollTimeout = setTimeout(function() {
						clearInterval(pollInterval);
						resolve(false);
					}, timeout * 1e3);
				})];
			});
		});
	};
	Solflare.IFRAME_URL = "https://connect.solflare.com/";
	return Solflare;
}(eventemitter3_default);
//#endregion
export { esm_exports as t };
