import { readFile, writeFile } from "node:fs/promises";
import { Observable, Subject } from "rxjs";
import kdbxweb, { Kdbx } from "kdbxweb";
import IVaultManager from "./IVaultManager";
import { VaultData } from "../../../models/VaultData";
import argon2Hash from "../../utilities/argon2Hash";
import getKDBXGroupEntries from "../../utilities/getKDBXGroupEntries";

const DEFAULT_FIELDS_ORDER = ["Title", "URL", "UserName", "Password", "Notes"] as const;

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
		let vaultData: VaultData | null;
		if (this._kdbxVault != null) {
			const name = this._kdbxVault.meta.name ?? "";
			const recycleBinUUID = this._kdbxVault.meta.recycleBinUuid?.id;
			const entries = this._kdbxVault.groups
				.flatMap((group) => getKDBXGroupEntries(group))
				.map(({ entry, groupPath }) => {
					const fieldsOrderData = entry.customData?.get("fieldsData")?.value;
					return {
						uuid: entry.uuid.id,
						groupPath,
						fields: [...entry.fields].map(([name, field]) => {
							const isProtected = field instanceof kdbxweb.ProtectedValue;
							return {
								name,
								field: !isProtected ? field : undefined,
								isProtected
							};
						}),
						fieldsOrder: fieldsOrderData != null ? (JSON.parse(fieldsOrderData) as string[]) : [...DEFAULT_FIELDS_ORDER]
					};
				});
			vaultData = { name, recycleBinUUID, entries };
		} else {
			vaultData = null;
		}
		return vaultData;
	}

	get isDirty(): boolean {
		return this._isDirty;
	}

	getEntryFieldValue(entryUUID: string, fieldName: string): string | undefined {
		const entry = this._kdbxVault?.groups.flatMap((group) => [...group.allEntries()]).find((entry) => entry.uuid.id === entryUUID);
		const field = entry?.fields.get(fieldName);
		const value = field instanceof kdbxweb.ProtectedValue ? field.getText() : field;
		return value;
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
