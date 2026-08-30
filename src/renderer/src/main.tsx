import "./assets/main.css";
import OneClickVaultApp from "./dependencies/managers/OneClickVaultApp";
import ViewManager from "./dependencies/managers/ViewManager";
import ThemeManager from "./dependencies/managers/ThemeManager";

const DEFAULT_VIEW = "unlock-vault";

// #region Pure dependency injection
void (async () => {
	// #region Managers
	const viewManager = new ViewManager(DEFAULT_VIEW);
	const themeManager = new ThemeManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(viewManager, themeManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
