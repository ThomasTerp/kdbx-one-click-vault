import { Observable } from "rxjs";
import { VaultData } from "../../../models/VaultData";

export default interface IVaultManager {
	readonly change$: Observable<void>;
	vaultFilePath: string | null;
	readonly vaultData: VaultData | null;
	readonly isDirty: boolean;

	newVault(): Promise<void>;

	loadVault(vaultFilePath: string, password: string | null, keyFilePath: string | null): Promise<boolean>;

	saveVault(): Promise<void>;

	closeVault(): Promise<void>;
}
