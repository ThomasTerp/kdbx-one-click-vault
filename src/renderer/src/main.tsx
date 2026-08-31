import "./assets/main.css";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";
import VaultManager from "./dependencies/managers/VaultManager";

// #region Pure dependency injection
void (async () => {
	// #region Managers
	const themeManager = new ThemeManager();
	const vaultManager = new VaultManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager, vaultManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
