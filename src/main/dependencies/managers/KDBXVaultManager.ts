import { readFile, writeFile } from "node:fs/promises";
import { Observable, Subject } from "rxjs";
import kdbxweb, { Kdbx } from "kdbxweb";
import IVaultManager from "./IVaultManager";
import { VaultData } from "../../../models/VaultData";
import argon2Hash from "../../utilities/argon2Hash";

export default class KDBXVaultManager implements IVaultManager {
	vaultFilePath: string | null;
	private _change$: Subject<void>;
	private _kdbxVault: Kdbx | null;
	private _isDirty: boolean;

	constructor() {
		this.vaultFilePath = null;
		this._change$ = new Subject();
		this._kdbxVault = null;
		this._isDirty = false;
		kdbxweb.CryptoEngine.setArgon2Impl(argon2Hash);
	}

	get change$(): Observable<void> {
		return this._change$.asObservable();
	}

	get vaultData(): VaultData | null {
		let vaultInfo: VaultData | null;
		if (this._kdbxVault != null) {
			const name = this._kdbxVault.meta.name ?? "";
			vaultInfo = { name };
		} else {
			vaultInfo = null;
		}
		return vaultInfo;
	}

	get isDirty(): boolean {
		return this._isDirty;
	}

	async newVault(): Promise<void> {
		const credentials = new kdbxweb.Credentials(null, null);
		this._kdbxVault = kdbxweb.Kdbx.create(credentials, "");
		this._isDirty = true;
		this._change$.next();
	}

	async loadVault(vaultFilePath: string, password: string | null, keyFilePath: string | null): Promise<boolean> {
		const [fileData, keyFileData] = await Promise.all([readFile(vaultFilePath), keyFilePath != null ? readFile(keyFilePath) : Promise.resolve(null)]);
		const passwordValue = password != null && password !== "" ? kdbxweb.ProtectedValue.fromString(password) : null;
		const credentials = new kdbxweb.Credentials(passwordValue, keyFileData);
		let isLoaded: boolean;
		try {
			this._kdbxVault = await kdbxweb.Kdbx.load(kdbxweb.ByteUtils.arrayToBuffer(fileData), credentials);
			this.vaultFilePath = vaultFilePath;
			this._isDirty = false;
			this._change$.next();
			isLoaded = true;
		} catch (error) {
			if (!(error instanceof kdbxweb.KdbxError && error.code === kdbxweb.Consts.ErrorCodes.InvalidKey)) {
				throw error;
			}
			isLoaded = false;
		}
		return isLoaded;
	}

	async saveVault(): Promise<void> {
		if (this.vaultFilePath == null) {
			throw new Error("No file path provided");
		}
		if (this._kdbxVault == null) {
			throw new Error("Cannot save null KDBX vault");
		}
		const data = await this._kdbxVault.save();
		await writeFile(this.vaultFilePath, Buffer.from(data));
		this._isDirty = false;
		this._change$.next();
	}

	async closeVault(): Promise<void> {
		this.vaultFilePath = null;
		this._kdbxVault = null;
		this._isDirty = false;
		this._change$.next();
	}
}
