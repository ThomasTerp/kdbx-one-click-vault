import { Observable } from "rxjs";

export type Theme = "light" | "dark" | "system";

export default interface IThemeManager {
	readonly change$: Observable<void>;
	readonly theme: Theme;
	readonly isDark: boolean;

	initialize(): Promise<void>;
	setTheme(theme: Theme): Promise<void>;
}
