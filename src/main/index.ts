import OneClickVaultApp from "./dependencies/OneClickVaultApp";

// Pure dependency injection.
(() => {
	// #region App
	const oneClickVaultApp = new OneClickVaultApp();
	oneClickVaultApp.initialize();
	// #endregion
})();
