export type Theme = "light" | "dark" | "system";

export default interface IThemeManager {
	getTheme(): Theme;
	setTheme(theme: Theme): void;
}
