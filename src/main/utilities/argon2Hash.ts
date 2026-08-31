import { argon2d, argon2id } from "hash-wasm";
import { CryptoEngine } from "kdbxweb";

/**
 * Argon2 is used by KDBX4 vaults as their key derivation function. kdbxweb does not ship an
 * implementation itself (the calculations are too heavy to run in pure JS), so it has to be
 * provided and registered via `CryptoEngine.setArgon2Impl`.
 *
 * This uses `hash-wasm`, a WASM implementation, rather than a native Node addon: a native addon
 * has to be built for the exact ABI of the runtime that loads it, and Electron's bundled Node/V8
 * build isn't guaranteed to match plain Node's, so a native argon2 module can crash the process
 * outright. WASM runs identically inside V8 regardless of host, so there's no such risk.
 */
export default function argon2Hash(
	password: ArrayBuffer,
	salt: ArrayBuffer,
	memory: number,
	iterations: number,
	length: number,
	parallelism: number,
	type: CryptoEngine.Argon2Type,
	version: CryptoEngine.Argon2Version
): Promise<ArrayBuffer> {
	if (version !== 0x13) {
		// hash-wasm only implements the current Argon2 spec version (0x13). Version 0x10 was a
		// short-lived pre-standardization variant that essentially no real KDBX4 files use.
		return Promise.reject(new Error(`Unsupported argon2 version: 0x${version.toString(16)}`));
	}

	const hashFn = type === 0 ? argon2d : argon2id;

	return hashFn({
		password: new Uint8Array(password),
		salt: new Uint8Array(salt),
		iterations,
		parallelism,
		memorySize: memory,
		hashLength: length,
		outputType: "binary"
	}).then((hash) => new Uint8Array(hash).buffer);
}
