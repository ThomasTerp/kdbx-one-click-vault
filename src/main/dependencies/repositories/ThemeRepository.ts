import Store from "electron-store";
import IReadWriteRepository from "./IReadWriteRepository";
import { Theme } from "../../../models/Theme";

const THEME_STORE_KEY = "theme";
const DEFAULT_THEME: Theme = "system";

export default class ThemeRepository implements IReadWriteRepository<Theme> {
	private _store: Store;

	constructor(store: Store) {
		this._store = store;
	}

	async read(): Promise<Theme> {
		return this._store.get(THEME_STORE_KEY, DEFAULT_THEME) as Theme;
	}

	async write(value: Theme): Promise<void> {
		this._store.set(THEME_STORE_KEY, value);
	}
}
