import IUnlockFieldsManager, { UnlockFields } from "./IUnlockFieldsManager";

export default class UnlockFieldsManager implements IUnlockFieldsManager {
	async getUnlockFields(): Promise<UnlockFields> {
		return await window.api.getUnlockFields();
	}

	async setUnlockFields(unlockFields: UnlockFields): Promise<void> {
		await window.api.setUnlockFields(unlockFields);
	}
}
