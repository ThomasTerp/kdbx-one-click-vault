import { writeFile } from "node:fs/promises";
import { Observable, Subject } from "rxjs";
import kdbxweb, { Kdbx } from "kdbxweb";
import IVaultManager from "./IVaultManager";
import { VaultData } from "../../../models/VaultData";
import argon2Hash from "../../utilities/argon2Hash";

const NEW_VAULT_NAME = "Vault";

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
		this._kdbxVault = kdbxweb.Kdbx.create(credentials, NEW_VAULT_NAME);
		this._isDirty = true;
		this._change$.next();
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
