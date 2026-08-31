import { Observable, Subject } from "rxjs";
import IVaultManager, { VaultData } from "./IVaultManager";

export default class VaultManager implements IVaultManager {
	private _change$: Subject<void>;
	private _vaultData: VaultData | null;
	private _isDirty: boolean;
	private _vaultFilePath: string | null;

	constructor() {
		this._change$ = new Subject();
		this._vaultData = null;
		this._isDirty = false;
		this._vaultFilePath = null;
	}

	get change$(): Observable<void> {
		return this._change$.asObservable();
	}

	get vaultData(): VaultData | null {
		return this._vaultData;
	}

	get isDirty(): boolean {
		return this._isDirty;
	}

	get vaultFilePath(): string | null {
		return this._vaultFilePath;
	}

	async initialize(): Promise<void> {
		[this._vaultData, this._isDirty, this._vaultFilePath] = await Promise.all([
			window.api.getVaultData(),
			window.api.getIsDirty(),
			window.api.getVaultFilePath()
		]);
		window.api.onVaultChanged((vaultData, isDirty, vaultFilePath) => {
			this._vaultData = vaultData;
			this._isDirty = isDirty;
			this._vaultFilePath = vaultFilePath;
			this._change$.next();
		});
	}

	async newVault(): Promise<void> {
		await window.api.newVault();
	}

	async saveVault(): Promise<void> {
		await window.api.saveVault();
	}

	async saveVaultAs(): Promise<void> {
		await window.api.saveVaultAs();
	}

	async closeVault(force?: boolean): Promise<boolean> {
		return await window.api.closeVault(force);
	}
}
