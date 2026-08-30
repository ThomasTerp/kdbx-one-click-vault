import Store from "electron-store";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";

// #region Pure dependency injection
(() => {
	// #region Store
	const store = new Store();
	// #endregion

	// #region Managers
	const themeManager = new ThemeManager(store);
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager);
	oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
