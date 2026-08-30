import React from "react";
import ReactDOM from "react-dom/client";
import IApp from "./IApp";
import OneClickVault from "@renderer/components/OneClickVault";
import IViewManager from "./IViewManager";
import ViewManagerContext from "@renderer/contexts/ViewManagerContext";
import IThemeManager from "./IThemeManager";
import ThemeManagerContext from "@renderer/contexts/ThemeManagerContext";

export default class OneClickVaultApp implements IApp {
	private _viewManager: IViewManager;
	private _themeManager: IThemeManager;

	constructor(viewManager: IViewManager, themeManager: IThemeManager) {
		this._viewManager = viewManager;
		this._themeManager = themeManager;
	}

	async initialize(): Promise<void> {
		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<ViewManagerContext.Provider value={this._viewManager}>
					<ThemeManagerContext.Provider value={this._themeManager}>
						<OneClickVault />
					</ThemeManagerContext.Provider>
				</ViewManagerContext.Provider>
			</React.StrictMode>
		);
	}
}
