import { Observable, Subject } from "rxjs";
import IThemeManager, { Theme } from "./IThemeManager";

const DARK_CLASS = "dark";
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
			if (this._theme === "system") {
				this.applyTheme();
			}
		});
	}

	get change$(): Observable<void> {
		return this._change$.asObservable();
	}

	get theme(): Theme {
		return this._theme;
	}

	async initialize(): Promise<void> {
		this._theme = await window.api.getTheme();
		this.applyTheme();
	}

	async setTheme(theme: Theme): Promise<void> {
		this._theme = theme;
		await window.api.setTheme(theme);
		this.applyTheme();
	}

	private applyTheme(): void {
		const isDark = this._theme === "dark" || (this._theme === "system" && this._mediaQuery.matches);
		document.documentElement.classList.toggle(DARK_CLASS, isDark);
		this._change$.next();
	}
}
