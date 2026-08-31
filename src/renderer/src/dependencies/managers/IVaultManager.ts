import { Observable } from "rxjs";

export default interface IVaultManager {
	readonly change$: Observable<void>;
	readonly vaultData: VaultData | null;
	readonly isDirty: boolean;
	readonly vaultFilePath: string | null;

	initialize(): Promise<void>;
	newVault(): Promise<void>;
	saveVault(): Promise<void>;
	saveVaultAs(): Promise<void>;
	closeVault(force?: boolean): Promise<boolean>;
}

export interface VaultData {
	name: string;
}
