import { Observable, Subject } from "rxjs";
import IThemeManager from "./IThemeManager";
import { Theme } from "../../../models/Theme";
import IReadWriteRepository from "../repositories/IReadWriteRepository";

export default class ThemeManager implements IThemeManager {
	private _change$: Subject<Theme>;
	private _themeRepository: IReadWriteRepository<Theme>;

	constructor(themeRepository: IReadWriteRepository<Theme>) {
		this._change$ = new Subject();
		this._themeRepository = themeRepository;
	}

	get change$(): Observable<Theme> {
		return this._change$.asObservable();
	}

	async getTheme(): Promise<Theme> {
		return await this._themeRepository.read();
	}

	async setTheme(theme: Theme): Promise<void> {
		await this._themeRepository.write(theme);
		this._change$.next(theme);
	}
}
