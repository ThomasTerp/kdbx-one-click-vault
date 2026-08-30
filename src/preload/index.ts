import { contextBridge, ipcRenderer } from "electron";
import { electronAPI } from "@electron-toolkit/preload";
import type { Theme } from "../main/dependencies/managers/IThemeManager";

// Custom APIs for renderer
const api = {
	selectFile: (title?: string, filters?: Electron.FileFilter[]): Promise<string | null> =>
		ipcRenderer.invoke("dialog:selectFile", title, filters) as Promise<string | null>,
	getTheme: (): Promise<Theme> => ipcRenderer.invoke("theme:get") as Promise<Theme>,
	setTheme: (theme: Theme): Promise<void> => ipcRenderer.invoke("theme:set", theme) as Promise<void>
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
