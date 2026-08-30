import "./assets/main.css";
import OneClickVaultApp from "./dependencies/managers/OneClickVaultApp";
import ViewManager from "./dependencies/managers/ViewManager";

// Pure dependency injection.
(() => {
	// #region Managers
	const viewManager = new ViewManager("unlock-vault");
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickVaultApp(viewManager);
	oneClickVaultApp.initialize();
	// #endregion
})();
