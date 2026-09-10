import { Observable } from "rxjs";
import { VaultData } from "../../../../models/VaultData";

export default interface IVaultManager {
	readonly change$: Observable<void>;
	readonly vaultData: VaultData | null;
	readonly isDirty: boolean;
	readonly vaultFilePath: string | null;

	getEntryFieldValue(entryUUID: string, fieldName: string): Promise<string | undefined>;

	initialize(): Promise<void>;
	newVault(): Promise<void>;
	loadVault(filePath: string, password: string, keyFilePath: string | null): Promise<boolean>;
	saveVault(): Promise<void>;
	saveVaultAs(): Promise<void>;
	closeVault(force?: boolean): Promise<boolean>;
}
