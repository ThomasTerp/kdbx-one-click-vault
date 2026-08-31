import { Observable } from "rxjs";
import { Theme } from "../../../models/Theme";

export default interface IThemeManager {
	readonly change$: Observable<Theme>;

	getTheme(): Promise<Theme>;
	setTheme(theme: Theme): Promise<void>;
}
