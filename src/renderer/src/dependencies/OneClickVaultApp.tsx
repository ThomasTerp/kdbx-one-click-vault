import React from "react";
import ReactDOM from "react-dom/client";
import IApp from "./managers/IApp";
import OneClickVault from "@renderer/components/OneClickVault";
import IThemeManager from "./managers/IThemeManager";
import ThemeManagerContext from "@renderer/contexts/ThemeManagerContext";
import IVaultManager from "./managers/IVaultManager";
import VaultManagerContext from "@renderer/contexts/VaultManagerContext";
import IUnlockFieldsManager from "./managers/IUnlockFieldsManager";
import UnlockFieldsManagerContext from "@renderer/contexts/UnlockFieldsManagerContext";

export default class OneClickVaultApp implements IApp {
	private _themeManager: IThemeManager;
	private _vaultManager: IVaultManager;
	private _unlockFieldsManager: IUnlockFieldsManager;

	constructor(themeManager: IThemeManager, vaultManager: IVaultManager, unlockFieldsManager: IUnlockFieldsManager) {
		this._themeManager = themeManager;
		this._vaultManager = vaultManager;
		this._unlockFieldsManager = unlockFieldsManager;
	}

	async initialize(): Promise<void> {
		await this._themeManager.initialize();
		await this._vaultManager.initialize();
		this.render();
	}

	private render() {
		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<ThemeManagerContext.Provider value={this._themeManager}>
					<VaultManagerContext.Provider value={this._vaultManager}>
						<UnlockFieldsManagerContext.Provider value={this._unlockFieldsManager}>
							<OneClickVault />
						</UnlockFieldsManagerContext.Provider>
					</VaultManagerContext.Provider>
				</ThemeManagerContext.Provider>
			</React.StrictMode>
		);
	}
}
