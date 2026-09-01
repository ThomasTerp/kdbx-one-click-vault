import IUnlockFieldsManager from "./IUnlockFieldsManager";
import { UnlockFields } from "../../../models/UnlockFields";
import IReadWriteRepository from "../repositories/IReadWriteRepository";

export default class UnlockFieldsManager implements IUnlockFieldsManager {
	private _unlockFieldsRepository: IReadWriteRepository<UnlockFields>;

	constructor(unlockFieldsRepository: IReadWriteRepository<UnlockFields>) {
		this._unlockFieldsRepository = unlockFieldsRepository;
	}

	async getUnlockFields(): Promise<UnlockFields> {
		return await this._unlockFieldsRepository.read();
	}

	async setUnlockFields(unlockFields: UnlockFields): Promise<void> {
		await this._unlockFieldsRepository.write(unlockFields);
	}
}
