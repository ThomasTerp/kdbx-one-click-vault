import { UnlockFields } from "../../../models/UnlockFields";

export default interface IUnlockFieldsManager {
	getUnlockFields(): Promise<UnlockFields>;
	setUnlockFields(unlockFields: UnlockFields): Promise<void>;
}
