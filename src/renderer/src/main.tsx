import "./assets/main.css";
import OneClickVaultApp from "./dependencies/OneClickVaultApp";
import ThemeManager from "./dependencies/managers/ThemeManager";
import VaultManager from "./dependencies/managers/VaultManager";
import UnlockFieldsManager from "./dependencies/managers/UnlockFieldsManager";

// #region Pure dependency injection
void (async () => {
	// #region Managers
	const themeManager = new ThemeManager();
	const vaultManager = new VaultManager();
	const unlockFieldsManager = new UnlockFieldsManager();
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(themeManager, vaultManager, unlockFieldsManager);
	await oneClickVaultApp.initialize();
	// #endregion
})();
// #endregion
