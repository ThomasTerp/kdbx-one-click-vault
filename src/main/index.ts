import Store from "electron-store";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";
import IVaultManager from "./dependencies/managers/IVaultManager";
import IThemeManager from "./dependencies/managers/IThemeManager";
import KDBXVaultManager from "./dependencies/managers/KDBXVaultManager";

// #region Pure dependency injection
void (async () => {
	// #region Store
	const store = new Store();
	// #endregion

	// #region Managers
	const themeManager: IThemeManager = new ThemeManager(store);
	const vaultManager: IVaultManager = new KDBXVaultManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager, vaultManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
