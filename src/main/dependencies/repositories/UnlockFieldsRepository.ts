import Store from "electron-store";
import IReadWriteRepository from "./IReadWriteRepository";
import { UnlockFields } from "../../../models/UnlockFields";

const UNLOCK_FIELDS_STORE_KEY = "unlockFields";
const DEFAULT_UNLOCK_FIELDS: UnlockFields = { vaultFilePath: "", keyFilePath: "" };

export default class UnlockFieldsRepository implements IReadWriteRepository<UnlockFields> {
	private _store: Store;

	constructor(store: Store) {
		this._store = store;
	}

	async read(): Promise<UnlockFields> {
		return this._store.get(UNLOCK_FIELDS_STORE_KEY, DEFAULT_UNLOCK_FIELDS) as UnlockFields;
	}

	async write(value: UnlockFields): Promise<void> {
		this._store.set(UNLOCK_FIELDS_STORE_KEY, value);
	}
}
