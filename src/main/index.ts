import Store from "electron-store";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";
import IVaultManager from "./dependencies/managers/IVaultManager";
import IThemeManager from "./dependencies/managers/IThemeManager";
import { Theme } from "../models/Theme";
import KDBXVaultManager from "./dependencies/managers/KDBXVaultManager";
import ThemeRepository from "./dependencies/repositories/ThemeRepository";
import IReadWriteRepository from "./dependencies/repositories/IReadWriteRepository";
import UnlockFieldsRepository from "./dependencies/repositories/UnlockFieldsRepository";
import UnlockFieldsManager from "./dependencies/managers/UnlockFieldsManager";
import IUnlockFieldsManager from "./dependencies/managers/IUnlockFieldsManager";
import { UnlockFields } from "../models/UnlockFields";

// #region Pure dependency injection
void (async () => {
	// #region Store
	const store = new Store();
	// #endregion

	// #region Repositories
	const themeRepository: IReadWriteRepository<Theme> = new ThemeRepository(store);
	const unlockFieldsRepository: IReadWriteRepository<UnlockFields> = new UnlockFieldsRepository(store);
	// #endregion

	// #region Managers
	const themeManager: IThemeManager = new ThemeManager(themeRepository);
	const unlockFieldsManager: IUnlockFieldsManager = new UnlockFieldsManager(unlockFieldsRepository);
	const vaultManager: IVaultManager = new KDBXVaultManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager, vaultManager, unlockFieldsManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
