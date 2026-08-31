import Store from "electron-store";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";
import IVaultManager from "./dependencies/managers/IVaultManager";
import IThemeManager from "./dependencies/managers/IThemeManager";
import { Theme } from "../models/Theme";
import KDBXVaultManager from "./dependencies/managers/KDBXVaultManager";
import ThemeRepository from "./dependencies/repositories/ThemeRepository";
import IReadWriteRepository from "./dependencies/repositories/IReadWriteRepository";

// #region Pure dependency injection
void (async () => {
	// #region Store
	const store = new Store();
	// #endregion

	// #region Repositories
	const themeRepository: IReadWriteRepository<Theme> = new ThemeRepository(store);
	// #endregion

	// #region Managers
	const themeManager: IThemeManager = new ThemeManager(themeRepository);
	const vaultManager: IVaultManager = new KDBXVaultManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager, vaultManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
