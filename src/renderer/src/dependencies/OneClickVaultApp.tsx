import React from "react";
import ReactDOM from "react-dom/client";
import IApp from "./managers/IApp";
import OneClickVault from "@renderer/components/OneClickVault";
import IThemeManager from "./managers/IThemeManager";
import ThemeManagerContext from "@renderer/contexts/ThemeManagerContext";
import IVaultManager from "./managers/IVaultManager";
import VaultManagerContext from "@renderer/contexts/VaultManagerContext";

const TITLE = "One Click Vault";

export default class OneClickVaultApp implements IApp {
	private _themeManager: IThemeManager;
	private _vaultManager: IVaultManager;

	constructor(themeManager: IThemeManager, vaultManager: IVaultManager) {
		this._themeManager = themeManager;
		this._vaultManager = vaultManager;
	}

	async initialize(): Promise<void> {
		await this._themeManager.initialize();
		await this._vaultManager.initialize();
		this._vaultManager.change$.subscribe(() => this.updateTitle());
		this.updateTitle();
		this.render();
	}

	private updateTitle() {
		document.title = `${this._vaultManager.vaultData != null ? `${this._vaultManager.vaultFilePath ?? ""}${this._vaultManager.isDirty ? "*" : ""} - ` : ""}${TITLE}`;
	}

	private render() {
		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<ThemeManagerContext.Provider value={this._themeManager}>
					<VaultManagerContext.Provider value={this._vaultManager}>
						<OneClickVault />
					</VaultManagerContext.Provider>
				</ThemeManagerContext.Provider>
			</React.StrictMode>
		);
	}
}
