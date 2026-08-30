import { app, shell, BrowserWindow, dialog, ipcMain } from "electron";
import { join } from "node:path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import IApp from "./IApp";

const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 670;

export default class OneClickVaultApp implements IApp {
	initialize(): void {
		void app.whenReady().then(() => {
			electronApp.setAppUserModelId("com.kdbx-one-click-vault.app");
			app.on("browser-window-created", (_, window) => {
				optimizer.watchWindowShortcuts(window);
			});
			this.initializeIPC();
			this.createWindow();
			app.on("activate", () => {
				if (BrowserWindow.getAllWindows().length === 0) {
					this.createWindow();
				}
			});
		});
		app.on("window-all-closed", () => {
			if (process.platform !== "darwin") {
				app.quit();
			}
		});
	}

	private initializeIPC(): void {
		ipcMain.handle("dialog:openFile", async (event, title?: string, filters?: Electron.FileFilter[]) => {
			const parent = BrowserWindow.fromWebContents(event.sender);
			const { canceled, filePaths } = await (parent != null
				? dialog.showOpenDialog(parent, { properties: ["openFile"], title, filters })
				: dialog.showOpenDialog({ properties: ["openFile"], title, filters }));
			return (!canceled && filePaths.at(0)) ?? null;
		});
	}

	private createWindow(): void {
		const window = new BrowserWindow({
			width: WINDOW_WIDTH,
			height: WINDOW_HEIGHT,
			show: false,
			autoHideMenuBar: true,
			webPreferences: {
				preload: join(__dirname, "../preload/index.js"),
				sandbox: false
			}
		});
		window.on("ready-to-show", () => {
			window.show();
		});
		window.webContents.setWindowOpenHandler((details) => {
			void shell.openExternal(details.url);
			return {
				action: "deny"
			};
		});
		// HMR for renderer based on electron-vite cli.
		// Load the remote URL for development or the local html file for production.
		if (is.dev && process.env["ELECTRON_RENDERER_URL"]) {
			void window.loadURL(process.env["ELECTRON_RENDERER_URL"]);
		} else {
			void window.loadFile(join(__dirname, "../renderer/index.html"));
		}
	}
}
