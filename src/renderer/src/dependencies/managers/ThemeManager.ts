import { Observable, Subject } from "rxjs";
import IThemeManager, { Theme } from "./IThemeManager";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

export default class ThemeManager implements IThemeManager {
	private _change$: Subject<void>;
	private _theme: Theme;
	private _mediaQuery: MediaQueryList;

	constructor() {
		this._change$ = new Subject();
		this._theme = "system";
		this._mediaQuery = window.matchMedia(COLOR_SCHEME_QUERY);
		this._mediaQuery.addEventListener("change", () => {
			this._change$.next();
		});
	}

	get change$(): Observable<void> {
		return this._change$.asObservable();
	}

	get theme(): Theme {
		return this._theme;
	}

	get isDark(): boolean {
		return this._theme === "dark" || (this._theme === "system" && this._mediaQuery.matches);
	}

	async initialize(): Promise<void> {
		this._theme = await window.api.getTheme();
		this._change$.next();
		window.api.onThemeChanged((theme) => {
			this._theme = theme;
			this._change$.next();
		});
	}

	async setTheme(theme: Theme): Promise<void> {
		await window.api.setTheme(theme);
	}
}
