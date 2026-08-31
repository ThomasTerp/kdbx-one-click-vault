export default interface IVaultManager {
	vaultFilePath: string | null;
	readonly vaultData: VaultData | null;
	readonly isDirty: boolean;

	newVault(): Promise<void>;

	saveVault(): Promise<void>;

	closeVault(): Promise<void>;
}

export interface VaultData {
	name: string;
}
