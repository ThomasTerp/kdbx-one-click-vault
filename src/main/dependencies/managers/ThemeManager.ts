import Store from "electron-store";
import IThemeManager, { Theme } from "./IThemeManager";

const THEME_STORE_KEY = "theme";
const DEFAULT_THEME: Theme = "system";

export default class ThemeManager implements IThemeManager {
	private _store: Store;

	constructor(store: Store) {
		this._store = store;
	}

	getTheme(): Theme {
		return this._store.get(THEME_STORE_KEY, DEFAULT_THEME) as Theme;
	}

	setTheme(theme: Theme): void {
		this._store.set(THEME_STORE_KEY, theme);
	}
}
