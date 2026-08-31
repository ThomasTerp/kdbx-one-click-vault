export default interface IVaultManager {
	vaultFilePath: string | null;
	readonly isDirty: boolean;

	newVault(): Promise<void>;

	saveVault(): Promise<void>;

	closeVault(): Promise<void>;
}
