import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { Theme } from "../models/Theme";
import type { VaultData } from "../models/VaultData";

// Custom APIs for renderer
const api = {
	selectFile: (title?: string, filters?: Electron.FileFilter[]): Promise<string | null> =>
		ipcRenderer.invoke("dialog:selectFile", title, filters) as Promise<string | null>,
	getTheme: (): Promise<Theme> => ipcRenderer.invoke("theme:get") as Promise<Theme>,
	setTheme: (theme: Theme): Promise<void> => ipcRenderer.invoke("theme:set", theme) as Promise<void>,
	onThemeChanged: (callback: (theme: Theme) => void): (() => void) => {
		const listener = (_event: Electron.IpcRendererEvent, theme: Theme): void => callback(theme);
		ipcRenderer.on("theme:changed", listener);
		return () => ipcRenderer.removeListener("theme:changed", listener);
	},
	getVaultData: (): Promise<VaultData | null> => ipcRenderer.invoke("vault:getVaultData") as Promise<VaultData | null>,
	getIsDirty: (): Promise<boolean> => ipcRenderer.invoke("vault:isDirty") as Promise<boolean>,
	getVaultFilePath: (): Promise<string | null> => ipcRenderer.invoke("vault:getVaultFilePath") as Promise<string | null>,
	onVaultChanged: (callback: (vaultData: VaultData | null, isDirty: boolean, vaultFilePath: string | null) => void): (() => void) => {
		const listener = (_event: Electron.IpcRendererEvent, vaultData: VaultData | null, isDirty: boolean, vaultFilePath: string | null): void =>
			callback(vaultData, isDirty, vaultFilePath);
		ipcRenderer.on("vault:changed", listener);
		return () => ipcRenderer.removeListener("vault:changed", listener);
	},
	newVault: (): Promise<void> => ipcRenderer.invoke("vault:new") as Promise<void>,
	saveVault: (): Promise<void> => ipcRenderer.invoke("vault:save") as Promise<void>,
	saveVaultAs: (): Promise<void> => ipcRenderer.invoke("vault:saveAs") as Promise<void>,
	closeVault: (force?: boolean): Promise<boolean> => ipcRenderer.invoke("vault:close", force) as Promise<boolean>
};

// Use `contextBridge` APIs to expose Electron APIs to renderer only if context isolation is enabled, otherwise just add to the DOM global.
if (process.contextIsolated) {
	try {
		contextBridge.exposeInMainWorld("electron", electronAPI);
		contextBridge.exposeInMainWorld("api", api);
	} catch (error) {
		console.error(error);
	}
} else {
	// @ts-ignore (define in dts)
	window.electron = electronAPI;
	// @ts-ignore (define in dts)
	window.api = api;
}
