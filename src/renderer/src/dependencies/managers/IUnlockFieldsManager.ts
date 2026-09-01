export interface UnlockFields {
	vaultFilePath: string;
	keyFilePath: string;
}

export default interface IUnlockFieldsManager {
	getUnlockFields(): Promise<UnlockFields>;
	setUnlockFields(unlockFields: UnlockFields): Promise<void>;
}
