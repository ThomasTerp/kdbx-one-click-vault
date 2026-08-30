import React from "react";
import ReactDOM from "react-dom/client";
import IApp from "./IApp";
import OneClickVault from "@renderer/components/OneClickVault";
import IViewManager from "./IViewManager";
import ViewManagerContext from "@renderer/contexts/ViewManagerContext";

export default class OneClickVaultApp implements IApp {
	private _viewManager: IViewManager;

	constructor(viewManager: IViewManager) {
		this._viewManager = viewManager;
	}

	initialize(): void {
		ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
			<React.StrictMode>
				<ViewManagerContext.Provider value={this._viewManager}>
					<OneClickVault />
				</ViewManagerContext.Provider>
			</React.StrictMode>
		);
	}
}
