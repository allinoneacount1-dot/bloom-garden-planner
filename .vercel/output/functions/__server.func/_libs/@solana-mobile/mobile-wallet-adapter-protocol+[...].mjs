//#region node_modules/@solana/errors/dist/index.node.mjs
var SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE = 8078012;
function encodeValue(value) {
	if (Array.isArray(value)) return "%5B" + value.map(encodeValue).join("%2C%20") + "%5D";
	else if (typeof value === "bigint") return `${value}n`;
	else return encodeURIComponent(String(value != null && Object.getPrototypeOf(value) === null ? { ...value } : value));
}
function encodeObjectContextEntry([key, value]) {
	return `${key}=${encodeValue(value)}`;
}
function encodeContextObject(context) {
	const searchParamsString = Object.entries(context).map(encodeObjectContextEntry).join("&");
	return Buffer.from(searchParamsString, "utf8").toString("base64");
}
function getErrorMessage(code, context = {}) {
	{
		let decodingAdviceMessage = `Solana error #${code}; Decode this error by running \`npx @solana/errors decode -- ${code}`;
		if (Object.keys(context).length) decodingAdviceMessage += ` '${encodeContextObject(context)}'`;
		return `${decodingAdviceMessage}\``;
	}
}
var SolanaError = class extends Error {
	/**
	* Indicates the root cause of this {@link SolanaError}, if any.
	*
	* For example, a transaction error might have an instruction error as its root cause. In this
	* case, you will be able to access the instruction error on the transaction error as `cause`.
	*/
	cause = this.cause;
	/**
	* Contains context that can assist in understanding or recovering from a {@link SolanaError}.
	*/
	context;
	constructor(...[code, contextAndErrorOptions]) {
		let context;
		let errorOptions;
		if (contextAndErrorOptions) Object.entries(Object.getOwnPropertyDescriptors(contextAndErrorOptions)).forEach(([name, descriptor]) => {
			if (name === "cause") errorOptions = { cause: descriptor.value };
			else {
				if (context === void 0) context = { __code: code };
				Object.defineProperty(context, name, descriptor);
			}
		});
		const message = getErrorMessage(code, context);
		super(message, errorOptions);
		this.context = Object.freeze(context === void 0 ? { __code: code } : context);
		this.name = "SolanaError";
	}
};
//#endregion
//#region node_modules/@solana/codecs-core/dist/index.node.mjs
function getEncodedSize(value, encoder) {
	return "fixedSize" in encoder ? encoder.fixedSize : encoder.getSizeFromValue(value);
}
function createEncoder(encoder) {
	return Object.freeze({
		...encoder,
		encode: (value) => {
			const bytes = new Uint8Array(getEncodedSize(value, encoder));
			encoder.write(value, bytes, 0);
			return bytes;
		}
	});
}
function createDecoder(decoder) {
	return Object.freeze({
		...decoder,
		decode: (bytes, offset = 0) => decoder.read(bytes, offset)[0]
	});
}
function toArrayBuffer(bytes, offset, length) {
	const bytesOffset = bytes.byteOffset + (offset ?? 0);
	const bytesLength = length ?? bytes.byteLength;
	let buffer;
	if (typeof SharedArrayBuffer === "undefined") buffer = bytes.buffer;
	else if (bytes.buffer instanceof SharedArrayBuffer) {
		buffer = new ArrayBuffer(bytes.length);
		new Uint8Array(buffer).set(new Uint8Array(bytes));
	} else buffer = bytes.buffer;
	return (bytesOffset === 0 || bytesOffset === -bytes.byteLength) && bytesLength === bytes.byteLength ? buffer : buffer.slice(bytesOffset, bytesOffset + bytesLength);
}
//#endregion
//#region node_modules/@solana/codecs-strings/dist/index.node.mjs
function assertValidBaseString(alphabet4, testValue, givenValue = testValue) {
	if (!testValue.match(new RegExp(`^[${alphabet4}]*$`))) throw new SolanaError(SOLANA_ERROR__CODECS__INVALID_STRING_FOR_BASE, {
		alphabet: alphabet4,
		base: alphabet4.length,
		value: givenValue
	});
}
var getBaseXEncoder = (alphabet4) => {
	return createEncoder({
		getSizeFromValue: (value) => {
			const [leadingZeroes, tailChars] = partitionLeadingZeroes(value, alphabet4[0]);
			if (!tailChars) return value.length;
			const base10Number = getBigIntFromBaseX(tailChars, alphabet4);
			return leadingZeroes.length + Math.ceil(base10Number.toString(16).length / 2);
		},
		write(value, bytes, offset) {
			assertValidBaseString(alphabet4, value);
			if (value === "") return offset;
			const [leadingZeroes, tailChars] = partitionLeadingZeroes(value, alphabet4[0]);
			if (!tailChars) {
				bytes.set(new Uint8Array(leadingZeroes.length).fill(0), offset);
				return offset + leadingZeroes.length;
			}
			let base10Number = getBigIntFromBaseX(tailChars, alphabet4);
			const tailBytes = [];
			while (base10Number > 0n) {
				tailBytes.unshift(Number(base10Number % 256n));
				base10Number /= 256n;
			}
			const bytesToAdd = [...Array(leadingZeroes.length).fill(0), ...tailBytes];
			bytes.set(bytesToAdd, offset);
			return offset + bytesToAdd.length;
		}
	});
};
var getBaseXDecoder = (alphabet4) => {
	return createDecoder({ read(rawBytes, offset) {
		const bytes = offset === 0 || offset <= -rawBytes.byteLength ? rawBytes : rawBytes.slice(offset);
		if (bytes.length === 0) return ["", 0];
		let trailIndex = bytes.findIndex((n) => n !== 0);
		trailIndex = trailIndex === -1 ? bytes.length : trailIndex;
		const leadingZeroes = alphabet4[0].repeat(trailIndex);
		if (trailIndex === bytes.length) return [leadingZeroes, rawBytes.length];
		return [leadingZeroes + getBaseXFromBigInt(bytes.slice(trailIndex).reduce((sum, byte) => sum * 256n + BigInt(byte), 0n), alphabet4), rawBytes.length];
	} });
};
function partitionLeadingZeroes(value, zeroCharacter) {
	const [leadingZeros, tailChars] = value.split(new RegExp(`((?!${zeroCharacter}).*)`));
	return [leadingZeros, tailChars];
}
function getBigIntFromBaseX(value, alphabet4) {
	const base = BigInt(alphabet4.length);
	let sum = 0n;
	for (const char of value) {
		sum *= base;
		sum += BigInt(alphabet4.indexOf(char));
	}
	return sum;
}
function getBaseXFromBigInt(value, alphabet4) {
	const base = BigInt(alphabet4.length);
	const tailChars = [];
	while (value > 0n) {
		tailChars.unshift(alphabet4[Number(value % base)]);
		value /= base;
	}
	return tailChars.join("");
}
var alphabet2 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
var getBase58Encoder = () => getBaseXEncoder(alphabet2);
var getBase58Decoder = () => getBaseXDecoder(alphabet2);
var alphabet3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var getBase64Encoder = () => {
	return createEncoder({
		getSizeFromValue: (value) => Buffer.from(value, "base64").length,
		write(value, bytes, offset) {
			assertValidBaseString(alphabet3, value.replace(/=/g, ""));
			const buffer = Buffer.from(value, "base64");
			bytes.set(buffer, offset);
			return buffer.length + offset;
		}
	});
};
var getBase64Decoder = () => {
	return createDecoder({ read: (bytes, offset = 0) => [Buffer.from(toArrayBuffer(bytes), offset).toString("base64"), bytes.length] });
};
var removeNullCharacters = (value) => value.replace(/\u0000/g, "");
var e = globalThis.TextDecoder;
var o = globalThis.TextEncoder;
var getUtf8Encoder = () => {
	let textEncoder;
	return createEncoder({
		getSizeFromValue: (value) => (textEncoder ||= new o()).encode(value).length,
		write: (value, bytes, offset) => {
			const bytesToAdd = (textEncoder ||= new o()).encode(value);
			bytes.set(bytesToAdd, offset);
			return offset + bytesToAdd.length;
		}
	});
};
var getUtf8Decoder = () => {
	let textDecoder;
	return createDecoder({ read(bytes, offset) {
		return [removeNullCharacters((textDecoder ||= new e()).decode(bytes.slice(offset))), bytes.length];
	} });
};
//#endregion
//#region node_modules/@solana-mobile/mobile-wallet-adapter-protocol/lib/esm/chunks/encoding.js
function encode(input) {
	return getBase64Decoder().decode(getUtf8Encoder().encode(input));
}
function fromUint8Array$1(byteArray, urlsafe) {
	const base64 = getBase64Decoder().decode(byteArray);
	if (urlsafe) return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
	else return base64;
}
function toUint8Array$1(base64EncodedByteArray) {
	return getBase64Encoder().encode(base64EncodedByteArray);
}
function fromUint8Array(byteArray) {
	return getBase58Decoder().decode(byteArray);
}
function toUint8Array(base58EncodedByteArray) {
	return getBase58Encoder().encode(base58EncodedByteArray);
}
function base64ToBase58$1(base64EncodedString) {
	return fromUint8Array(toUint8Array$1(base64EncodedString));
}
function arrayBufferToBase64String(buffer) {
	return fromUint8Array$1(new Uint8Array(buffer));
}
function base58FromUint8Array(byteArray) {
	return fromUint8Array(byteArray);
}
function base58ToUint8Array(base58EncodedByteArray) {
	return toUint8Array(base58EncodedByteArray);
}
function base64FromUint8Array(byteArray) {
	return fromUint8Array$1(byteArray);
}
function base64ToUint8Array(base64EncodedByteArray) {
	return toUint8Array$1(base64EncodedByteArray);
}
function utf8FromUint8Array(byteArray) {
	return getUtf8Decoder().decode(byteArray);
}
function utf8ToUint8Array(input) {
	return getUtf8Encoder().encode(input);
}
new RegExp(`^(?<domain>[^\\n]+?) wants you to sign in with your Solana account:\\n(?<address>[^\\n]+)(?:\\n|\$)(?:\\n(?<statement>[\\S\\s]*?)(?:\\n|\$))??(?:\\nURI: (?<uri>[^\\n]+))?(?:\\nVersion: (?<version>[^\\n]+))?(?:\\nChain ID: (?<chainId>[^\\n]+))?(?:\\nNonce: (?<nonce>[^\\n]+))?(?:\\nIssued At: (?<issuedAt>[^\\n]+))?(?:\\nExpiration Time: (?<expirationTime>[^\\n]+))?(?:\\nNot Before: (?<notBefore>[^\\n]+))?(?:\\nRequest ID: (?<requestId>[^\\n]+))?(?:\\nResources:(?<resources>(?:\\n- [^\\n]+)*))?\\n*$`);
/**
* TODO: docs
*/
function createSignInMessageText(input) {
	let message = `${input.domain} wants you to sign in with your Solana account:\n`;
	message += `${input.address}`;
	if (input.statement) message += `\n\n${input.statement}`;
	const fields = [];
	if (input.uri) fields.push(`URI: ${input.uri}`);
	if (input.version) fields.push(`Version: ${input.version}`);
	if (input.chainId) fields.push(`Chain ID: ${input.chainId}`);
	if (input.nonce) fields.push(`Nonce: ${input.nonce}`);
	if (input.issuedAt) fields.push(`Issued At: ${input.issuedAt}`);
	if (input.expirationTime) fields.push(`Expiration Time: ${input.expirationTime}`);
	if (input.notBefore) fields.push(`Not Before: ${input.notBefore}`);
	if (input.requestId) fields.push(`Request ID: ${input.requestId}`);
	if (input.resources) {
		fields.push(`Resources:`);
		for (const resource of input.resources) fields.push(`- ${resource}`);
	}
	if (fields.length) message += `\n\n${fields.join("\n")}`;
	return message;
}
//#endregion
//#region node_modules/@solana-mobile/mobile-wallet-adapter-protocol/lib/esm/index.js
var SolanaMobileWalletAdapterErrorCode = {
	ERROR_ASSOCIATION_PORT_OUT_OF_RANGE: "ERROR_ASSOCIATION_PORT_OUT_OF_RANGE",
	ERROR_REFLECTOR_ID_OUT_OF_RANGE: "ERROR_REFLECTOR_ID_OUT_OF_RANGE",
	ERROR_FORBIDDEN_WALLET_BASE_URL: "ERROR_FORBIDDEN_WALLET_BASE_URL",
	ERROR_SECURE_CONTEXT_REQUIRED: "ERROR_SECURE_CONTEXT_REQUIRED",
	ERROR_SESSION_CLOSED: "ERROR_SESSION_CLOSED",
	ERROR_SESSION_TIMEOUT: "ERROR_SESSION_TIMEOUT",
	ERROR_WALLET_NOT_FOUND: "ERROR_WALLET_NOT_FOUND",
	ERROR_INVALID_PROTOCOL_VERSION: "ERROR_INVALID_PROTOCOL_VERSION",
	ERROR_BROWSER_NOT_SUPPORTED: "ERROR_BROWSER_NOT_SUPPORTED",
	ERROR_LOOPBACK_ACCESS_BLOCKED: "ERROR_LOOPBACK_ACCESS_BLOCKED",
	ERROR_ASSOCIATION_CANCELLED: "ERROR_ASSOCIATION_CANCELLED"
};
var SolanaMobileWalletAdapterError = class extends Error {
	data;
	code;
	constructor(...args) {
		const [code, message, data] = args;
		super(message);
		this.code = code;
		this.data = data;
		this.name = "SolanaMobileWalletAdapterError";
	}
};
var SolanaMobileWalletAdapterProtocolError = class extends Error {
	data;
	code;
	jsonRpcMessageId;
	constructor(...args) {
		const [jsonRpcMessageId, code, message, data] = args;
		super(message);
		this.code = code;
		this.data = data;
		this.jsonRpcMessageId = jsonRpcMessageId;
		this.name = "SolanaMobileWalletAdapterProtocolError";
	}
};
async function createHelloReq(ecdhPublicKey, associationKeypairPrivateKey) {
	const publicKeyBuffer = await crypto.subtle.exportKey("raw", ecdhPublicKey);
	const signatureBuffer = await crypto.subtle.sign({
		hash: "SHA-256",
		name: "ECDSA"
	}, associationKeypairPrivateKey, publicKeyBuffer);
	const response = new Uint8Array(publicKeyBuffer.byteLength + signatureBuffer.byteLength);
	response.set(new Uint8Array(publicKeyBuffer), 0);
	response.set(new Uint8Array(signatureBuffer), publicKeyBuffer.byteLength);
	return response;
}
function createSIWSMessage(payload) {
	return createSignInMessageText(payload);
}
function createSIWSMessageBase64Url(payload) {
	return encode(createSIWSMessage(payload)).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
var SolanaSignTransactions = "solana:signTransactions";
var SolanaCloneAuthorization = "solana:cloneAuthorization";
/**
* Creates a {@link MobileWallet} proxy that handles backwards compatibility and API to RPC conversion.
*
* @param protocolVersion the protocol version in use for this session/request
* @param protocolRequestHandler callback function that handles sending the RPC request to the wallet endpoint.
* @returns a {@link MobileWallet} proxy
*/
function createMobileWalletProxy(protocolVersion, protocolRequestHandler) {
	return new Proxy({}, {
		get(target, p) {
			if (p === "then") return null;
			if (target[p] == null) target[p] = async function(inputParams) {
				const { method, params } = handleMobileWalletRequest(p, inputParams, protocolVersion);
				const result = await protocolRequestHandler(method, params);
				if (method === "authorize" && params.sign_in_payload && !result.sign_in_result) result.sign_in_result = await signInFallback(params.sign_in_payload, result, protocolRequestHandler);
				return handleMobileWalletResponse(p, result, protocolVersion);
			};
			return target[p];
		},
		defineProperty() {
			return false;
		},
		deleteProperty() {
			return false;
		}
	});
}
/**
* Handles all {@link MobileWallet} API requests and determines the correct MWA RPC method and params to call.
* This handles backwards compatibility, based on the provided @protocolVersion.
*
* @param methodName the name of {@link MobileWallet} method that was called
* @param methodParams the parameters that were passed to the method
* @param protocolVersion the protocol version in use for this session/request
* @returns the RPC request method and params that should be sent to the wallet endpoint
*/
function handleMobileWalletRequest(methodName, methodParams, protocolVersion) {
	let params = methodParams;
	let method = methodName.toString().replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).toLowerCase();
	switch (methodName) {
		case "authorize": {
			const authorizeParams = params;
			let { chain } = authorizeParams;
			if (protocolVersion === "legacy") {
				switch (chain) {
					case "solana:testnet":
						chain = "testnet";
						break;
					case "solana:devnet":
						chain = "devnet";
						break;
					case "solana:mainnet":
						chain = "mainnet-beta";
						break;
					default: chain = authorizeParams.cluster;
				}
				authorizeParams.cluster = chain;
				params = authorizeParams;
			} else {
				switch (chain) {
					case "testnet":
					case "devnet":
						chain = `solana:${chain}`;
						break;
					case "mainnet-beta":
						chain = "solana:mainnet";
						break;
				}
				authorizeParams.chain = chain;
				params = authorizeParams;
			}
		}
		case "reauthorize": {
			const { auth_token, identity } = params;
			if (auth_token) switch (protocolVersion) {
				case "legacy":
					method = "reauthorize";
					params = {
						auth_token,
						identity
					};
					break;
				default:
					method = "authorize";
					break;
			}
			break;
		}
	}
	return {
		method,
		params
	};
}
/**
* Handles all {@link MobileWallet} API responses and modifies the response for backwards compatibility, if needed
*
* @param method the {@link MobileWallet} method that was called
* @param response the original response that was returned by the method call
* @param protocolVersion the protocol version in use for this session/request
* @returns the possibly modified response
*/
function handleMobileWalletResponse(method, response, protocolVersion) {
	switch (method) {
		case "getCapabilities": {
			const capabilities = response;
			switch (protocolVersion) {
				case "legacy": {
					const features = [SolanaSignTransactions];
					if (capabilities.supports_clone_authorization === true) features.push(SolanaCloneAuthorization);
					return {
						...capabilities,
						features
					};
				}
				case "v1": return {
					...capabilities,
					supports_sign_and_send_transactions: true,
					supports_clone_authorization: capabilities.features.includes(SolanaCloneAuthorization)
				};
			}
		}
	}
	return response;
}
async function signInFallback(signInPayload, authorizationResult, protocolRequestHandler) {
	const domain = signInPayload.domain ?? window.location.host;
	const address = authorizationResult.accounts[0].address;
	const siwsMessage = createSIWSMessageBase64Url({
		...signInPayload,
		domain,
		address: base64ToBase58$1(address)
	});
	const signedPayload = toUint8Array$1((await protocolRequestHandler("sign_messages", {
		addresses: [address],
		payloads: [siwsMessage]
	})).signed_payloads[0]);
	const signedMessage = fromUint8Array$1(signedPayload.slice(0, signedPayload.length - 64));
	const signature = fromUint8Array$1(signedPayload.slice(signedPayload.length - 64));
	return {
		address,
		signed_message: signedMessage.length == 0 ? siwsMessage : signedMessage,
		signature
	};
}
function createSequenceNumberVector(sequenceNumber) {
	if (sequenceNumber >= 4294967296) throw new Error("Outbound sequence number overflow. The maximum sequence number is 32-bytes.");
	const byteArray = /* @__PURE__ */ new ArrayBuffer(4);
	new DataView(byteArray).setUint32(0, sequenceNumber, false);
	return new Uint8Array(byteArray);
}
var INITIALIZATION_VECTOR_BYTES = 12;
async function encryptMessage(plaintext, sequenceNumber, sharedSecret) {
	const sequenceNumberVector = createSequenceNumberVector(sequenceNumber);
	const initializationVector = new Uint8Array(INITIALIZATION_VECTOR_BYTES);
	crypto.getRandomValues(initializationVector);
	const ciphertext = await crypto.subtle.encrypt(getAlgorithmParams(sequenceNumberVector, initializationVector), sharedSecret, utf8ToUint8Array(plaintext));
	const response = new Uint8Array(sequenceNumberVector.byteLength + initializationVector.byteLength + ciphertext.byteLength);
	response.set(new Uint8Array(sequenceNumberVector), 0);
	response.set(new Uint8Array(initializationVector), sequenceNumberVector.byteLength);
	response.set(new Uint8Array(ciphertext), sequenceNumberVector.byteLength + initializationVector.byteLength);
	return response;
}
async function decryptMessage(message, sharedSecret) {
	const sequenceNumberVector = message.slice(0, 4);
	const initializationVector = message.slice(4, 16);
	const ciphertext = message.slice(16);
	const plaintextBuffer = await crypto.subtle.decrypt(getAlgorithmParams(sequenceNumberVector, initializationVector), sharedSecret, ciphertext);
	return utf8FromUint8Array(new Uint8Array(plaintextBuffer));
}
function getAlgorithmParams(sequenceNumber, initializationVector) {
	return {
		additionalData: sequenceNumber,
		iv: initializationVector,
		name: "AES-GCM",
		tagLength: 128
	};
}
async function generateAssociationKeypair() {
	return await crypto.subtle.generateKey({
		name: "ECDSA",
		namedCurve: "P-256"
	}, false, ["sign"]);
}
async function generateECDHKeypair() {
	return await crypto.subtle.generateKey({
		name: "ECDH",
		namedCurve: "P-256"
	}, false, ["deriveKey", "deriveBits"]);
}
function getRandomAssociationPort() {
	return assertAssociationPort(49152 + Math.floor(Math.random() * 16384));
}
function assertAssociationPort(port) {
	if (port < 49152 || port > 65535) throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_ASSOCIATION_PORT_OUT_OF_RANGE, `Association port number must be between 49152 and 65535. ${port} given.`, { port });
	return port;
}
function getStringWithURLUnsafeBase64CharactersReplaced(unsafeBase64EncodedString) {
	return unsafeBase64EncodedString.replace(/[/+=]/g, (m) => ({
		"/": "_",
		"+": "-",
		"=": "."
	})[m]);
}
var INTENT_NAME = "solana-wallet";
function getPathParts(pathString) {
	return pathString.replace(/(^\/+|\/+$)/g, "").split("/");
}
function getIntentURL(methodPathname, intentUrlBase) {
	let baseUrl = null;
	if (intentUrlBase) {
		try {
			baseUrl = new URL(intentUrlBase);
		} catch {}
		if (baseUrl?.protocol !== "https:") throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs");
	}
	baseUrl ||= new URL(`${INTENT_NAME}:/`);
	const pathname = methodPathname.startsWith("/") ? methodPathname : [...getPathParts(baseUrl.pathname), ...getPathParts(methodPathname)].join("/");
	return new URL(pathname, baseUrl);
}
async function getAssociateAndroidIntentURL(associationPublicKey, putativePort, associationURLBase, protocolVersions = ["v1"]) {
	const associationPort = assertAssociationPort(putativePort);
	const encodedKey = arrayBufferToBase64String(await crypto.subtle.exportKey("raw", associationPublicKey));
	const url = getIntentURL("v1/associate/local", associationURLBase);
	url.searchParams.set("association", getStringWithURLUnsafeBase64CharactersReplaced(encodedKey));
	url.searchParams.set("port", `${associationPort}`);
	protocolVersions.forEach((version) => {
		url.searchParams.set("v", version);
	});
	return url;
}
async function encryptJsonRpcMessage(jsonRpcMessage, sharedSecret) {
	const plaintext = JSON.stringify(jsonRpcMessage);
	const sequenceNumber = jsonRpcMessage.id;
	return encryptMessage(plaintext, sequenceNumber, sharedSecret);
}
async function decryptJsonRpcMessage(message, sharedSecret) {
	const plaintext = await decryptMessage(message, sharedSecret);
	const jsonRpcMessage = JSON.parse(plaintext);
	if (Object.hasOwnProperty.call(jsonRpcMessage, "error")) throw new SolanaMobileWalletAdapterProtocolError(jsonRpcMessage.id, jsonRpcMessage.error.code, jsonRpcMessage.error.message);
	return jsonRpcMessage;
}
async function parseHelloRsp(payloadBuffer, associationPublicKey, ecdhPrivateKey) {
	const [associationPublicKeyBuffer, walletPublicKey] = await Promise.all([crypto.subtle.exportKey("raw", associationPublicKey), crypto.subtle.importKey("raw", payloadBuffer.slice(0, 65), {
		name: "ECDH",
		namedCurve: "P-256"
	}, false, [])]);
	const sharedSecret = await crypto.subtle.deriveBits({
		name: "ECDH",
		public: walletPublicKey
	}, ecdhPrivateKey, 256);
	const ecdhSecretKey = await crypto.subtle.importKey("raw", sharedSecret, "HKDF", false, ["deriveKey"]);
	return await crypto.subtle.deriveKey({
		name: "HKDF",
		hash: "SHA-256",
		salt: new Uint8Array(associationPublicKeyBuffer),
		info: new Uint8Array()
	}, ecdhSecretKey, {
		name: "AES-GCM",
		length: 128
	}, false, ["encrypt", "decrypt"]);
}
async function parseSessionProps(message, sharedSecret) {
	const plaintext = await decryptMessage(message, sharedSecret);
	const jsonProperties = JSON.parse(plaintext);
	let protocolVersion = "legacy";
	if (Object.hasOwnProperty.call(jsonProperties, "v")) switch (jsonProperties.v) {
		case 1:
		case "1":
		case "v1":
			protocolVersion = "v1";
			break;
		case "legacy":
			protocolVersion = "legacy";
			break;
		default: throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_INVALID_PROTOCOL_VERSION, `Unknown/unsupported protocol version: ${jsonProperties.v}`);
	}
	return { protocol_version: protocolVersion };
}
var Browser = {
	Firefox: 0,
	Other: 1
};
function getBrowser() {
	return navigator.userAgent.indexOf("Firefox/") !== -1 ? Browser.Firefox : Browser.Other;
}
function getDetectionPromise() {
	return new Promise((resolve, reject) => {
		function cleanup() {
			clearTimeout(timeoutId);
			window.removeEventListener("blur", handleBlur);
		}
		function handleBlur() {
			cleanup();
			resolve();
		}
		window.addEventListener("blur", handleBlur);
		const timeoutId = setTimeout(() => {
			cleanup();
			reject();
		}, 3e3);
	});
}
var _frame = null;
function launchUrlThroughHiddenFrame(url) {
	if (_frame == null) {
		_frame = document.createElement("iframe");
		_frame.style.display = "none";
		document.body.appendChild(_frame);
	}
	_frame.contentWindow.location.href = url.toString();
}
async function launchAssociation(associationUrl) {
	if (associationUrl.protocol === "https:") window.location.assign(associationUrl);
	else try {
		switch (getBrowser()) {
			case Browser.Firefox:
				launchUrlThroughHiddenFrame(associationUrl);
				break;
			case Browser.Other: {
				const detectionPromise = getDetectionPromise();
				window.location.assign(associationUrl);
				await detectionPromise;
				break;
			}
			default:
		}
	} catch {
		throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_WALLET_NOT_FOUND, "Found no installed wallet that supports the mobile wallet protocol.");
	}
}
async function startSession(associationPublicKey, associationURLBase) {
	const randomAssociationPort = getRandomAssociationPort();
	await launchAssociation(await getAssociateAndroidIntentURL(associationPublicKey, randomAssociationPort, associationURLBase));
	return randomAssociationPort;
}
var WEBSOCKET_CONNECTION_CONFIG = {
	retryDelayScheduleMs: [
		150,
		150,
		200,
		500,
		500,
		750,
		750,
		1e3
	],
	timeoutMs: 3e4
};
var WEBSOCKET_PROTOCOL_BINARY = "com.solana.mobilewalletadapter.v1";
function assertSecureContext() {
	if (typeof window === "undefined" || window.isSecureContext !== true) throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SECURE_CONTEXT_REQUIRED, "The mobile wallet adapter protocol must be used in a secure context (`https`).");
}
function assertSecureEndpointSpecificURI(walletUriBase) {
	let url;
	try {
		url = new URL(walletUriBase);
	} catch {
		throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Invalid base URL supplied by wallet");
	}
	if (url.protocol !== "https:") throw new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_FORBIDDEN_WALLET_BASE_URL, "Base URLs supplied by wallets must be valid `https` URLs");
}
function getSequenceNumberFromByteArray(byteArray) {
	return new DataView(byteArray).getUint32(0, false);
}
async function startScenario(config) {
	assertSecureContext();
	const associationKeypair = await generateAssociationKeypair();
	const websocketURL = `ws://localhost:${await startSession(associationKeypair.publicKey, config?.baseUri)}/solana-wallet`;
	let connectionStartTime;
	const getNextRetryDelayMs = (() => {
		const schedule = [...WEBSOCKET_CONNECTION_CONFIG.retryDelayScheduleMs];
		return () => schedule.length > 1 ? schedule.shift() : schedule[0];
	})();
	let nextJsonRpcMessageId = 1;
	let lastKnownInboundSequenceNumber = 0;
	let state = { __type: "disconnected" };
	let socket;
	let sessionEstablished = false;
	let handleForceClose;
	return {
		close: () => {
			socket.close();
			handleForceClose();
		},
		wallet: new Promise((resolve, reject) => {
			const jsonRpcResponsePromises = {};
			const handleOpen = async () => {
				if (state.__type !== "connecting") {
					console.warn(`Expected adapter state to be \`connecting\` at the moment the websocket opens. Got \`${state.__type}\`.`);
					return;
				}
				socket.removeEventListener("open", handleOpen);
				const { associationKeypair } = state;
				const ecdhKeypair = await generateECDHKeypair();
				socket.send(await createHelloReq(ecdhKeypair.publicKey, associationKeypair.privateKey));
				state = {
					__type: "hello_req_sent",
					associationPublicKey: associationKeypair.publicKey,
					ecdhPrivateKey: ecdhKeypair.privateKey
				};
			};
			const handleClose = (evt) => {
				if (evt.wasClean) state = { __type: "disconnected" };
				else reject(new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_CLOSED, `The wallet session dropped unexpectedly (${evt.code}: ${evt.reason}).`, { closeEvent: evt }));
				disposeSocket();
			};
			const handleError = async (_evt) => {
				disposeSocket();
				if (Date.now() - connectionStartTime >= WEBSOCKET_CONNECTION_CONFIG.timeoutMs) reject(new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_TIMEOUT, `Failed to connect to the wallet websocket at ${websocketURL}.`));
				else {
					await new Promise((resolve) => {
						const retryDelayMs = getNextRetryDelayMs();
						retryWaitTimeoutId = window.setTimeout(resolve, retryDelayMs);
					});
					attemptSocketConnection();
				}
			};
			const handleMessage = async (evt) => {
				const responseBuffer = await evt.data.arrayBuffer();
				switch (state.__type) {
					case "connecting": {
						if (responseBuffer.byteLength !== 0) throw new Error("Encountered unexpected message while connecting");
						const ecdhKeypair = await generateECDHKeypair();
						socket.send(await createHelloReq(ecdhKeypair.publicKey, associationKeypair.privateKey));
						state = {
							__type: "hello_req_sent",
							associationPublicKey: associationKeypair.publicKey,
							ecdhPrivateKey: ecdhKeypair.privateKey
						};
						break;
					}
					case "connected":
						try {
							const sequenceNumber = getSequenceNumberFromByteArray(responseBuffer.slice(0, 4));
							if (sequenceNumber !== lastKnownInboundSequenceNumber + 1) throw new Error("Encrypted message has invalid sequence number");
							lastKnownInboundSequenceNumber = sequenceNumber;
							const jsonRpcMessage = await decryptJsonRpcMessage(responseBuffer, state.sharedSecret);
							const responsePromise = jsonRpcResponsePromises[jsonRpcMessage.id];
							delete jsonRpcResponsePromises[jsonRpcMessage.id];
							responsePromise.resolve(jsonRpcMessage.result);
						} catch (e) {
							if (e instanceof SolanaMobileWalletAdapterProtocolError) {
								const responsePromise = jsonRpcResponsePromises[e.jsonRpcMessageId];
								delete jsonRpcResponsePromises[e.jsonRpcMessageId];
								responsePromise.reject(e);
							} else throw e;
						}
						break;
					case "hello_req_sent": {
						if (responseBuffer.byteLength === 0) {
							const ecdhKeypair = await generateECDHKeypair();
							socket.send(await createHelloReq(ecdhKeypair.publicKey, associationKeypair.privateKey));
							state = {
								__type: "hello_req_sent",
								associationPublicKey: associationKeypair.publicKey,
								ecdhPrivateKey: ecdhKeypair.privateKey
							};
							break;
						}
						const sharedSecret = await parseHelloRsp(responseBuffer, state.associationPublicKey, state.ecdhPrivateKey);
						const sessionPropertiesBuffer = responseBuffer.slice(65);
						const sessionProperties = sessionPropertiesBuffer.byteLength !== 0 ? await (async () => {
							const sequenceNumber = getSequenceNumberFromByteArray(sessionPropertiesBuffer.slice(0, 4));
							if (sequenceNumber !== lastKnownInboundSequenceNumber + 1) throw new Error("Encrypted message has invalid sequence number");
							lastKnownInboundSequenceNumber = sequenceNumber;
							return parseSessionProps(sessionPropertiesBuffer, sharedSecret);
						})() : { protocol_version: "legacy" };
						state = {
							__type: "connected",
							sharedSecret,
							sessionProperties
						};
						const wallet = createMobileWalletProxy(sessionProperties.protocol_version, async (method, params) => {
							const id = nextJsonRpcMessageId++;
							socket.send(await encryptJsonRpcMessage({
								id,
								jsonrpc: "2.0",
								method,
								params: params ?? {}
							}, sharedSecret));
							return new Promise((resolve, reject) => {
								jsonRpcResponsePromises[id] = {
									resolve(result) {
										switch (method) {
											case "authorize":
											case "reauthorize": {
												const { wallet_uri_base } = result;
												if (wallet_uri_base != null) try {
													assertSecureEndpointSpecificURI(wallet_uri_base);
												} catch (e) {
													reject(e);
													return;
												}
												break;
											}
										}
										resolve(result);
									},
									reject
								};
							});
						});
						sessionEstablished = true;
						try {
							resolve(wallet);
						} catch (e) {
							reject(e);
						}
						break;
					}
				}
			};
			handleForceClose = () => {
				socket.removeEventListener("message", handleMessage);
				disposeSocket();
				if (!sessionEstablished) reject(new SolanaMobileWalletAdapterError(SolanaMobileWalletAdapterErrorCode.ERROR_SESSION_CLOSED, `The wallet session was closed before connection.`, { closeEvent: new CloseEvent("socket was closed before connection") }));
			};
			let disposeSocket;
			let retryWaitTimeoutId;
			const attemptSocketConnection = () => {
				if (disposeSocket) disposeSocket();
				state = {
					__type: "connecting",
					associationKeypair
				};
				if (connectionStartTime === void 0) connectionStartTime = Date.now();
				socket = new WebSocket(websocketURL, [WEBSOCKET_PROTOCOL_BINARY]);
				socket.addEventListener("open", handleOpen);
				socket.addEventListener("close", handleClose);
				socket.addEventListener("error", handleError);
				socket.addEventListener("message", handleMessage);
				disposeSocket = () => {
					window.clearTimeout(retryWaitTimeoutId);
					socket.removeEventListener("open", handleOpen);
					socket.removeEventListener("close", handleClose);
					socket.removeEventListener("error", handleError);
					socket.removeEventListener("message", handleMessage);
				};
			};
			attemptSocketConnection();
		})
	};
}
//#endregion
export { base58ToUint8Array as a, base58FromUint8Array as i, SolanaMobileWalletAdapterErrorCode as n, base64FromUint8Array as o, startScenario as r, base64ToUint8Array as s, SolanaMobileWalletAdapterError as t };
