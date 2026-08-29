import "./assets/main.css";
import OneClickApp from "./dependencies/managers/OneClickVaultApp";
import ViewManager from "./dependencies/managers/ViewManager";

// Pure dependency injection.
(() => {
	// #region Managers
	const viewManager = new ViewManager("unlock-vault");
	// #endregion

	// #region App
	const oneClickVaultApp = new OneClickApp(viewManager);
	oneClickVaultApp.initialize();
	// #endregion
})();
