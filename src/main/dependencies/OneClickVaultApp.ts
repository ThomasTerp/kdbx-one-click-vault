import { app, shell, BrowserWindow, dialog, ipcMain, IpcMainInvokeEvent } from "electron";
import { join } from "node:path";
import { electronApp, optimizer, is } from "@electron-toolkit/utils";
import IApp from "./IApp";
import IThemeManager, { Theme } from "./managers/IThemeManager";
import IVaultManager from "./managers/IVaultManager";

const APP_USER_MODEL_ID = "com.kdbx-one-click-vault.app";
const WINDOW_WIDTH = 900;
const WINDOW_HEIGHT = 670;

export default class OneClickVaultApp implements IApp {
	private _themeManager: IThemeManager;
	private _vaultManager: IVaultManager;

	constructor(themeManager: IThemeManager, vaultManager: IVaultManager) {
		this._themeManager = themeManager;
		this._vaultManager = vaultManager;
	}

	async initialize(): Promise<void> {
		void app.whenReady().then(() => {
			electronApp.setAppUserModelId(APP_USER_MODEL_ID);
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
		// #region Dialog
		ipcMain.handle("dialog:selectFile", async (event, title?: string, filters?: Electron.FileFilter[]) => {
			const parent = BrowserWindow.fromWebContents(event.sender);
			const { canceled, filePaths } = await (parent != null
				? dialog.showOpenDialog(parent, { properties: ["openFile"], title, filters })
				: dialog.showOpenDialog({ properties: ["openFile"], title, filters }));
			return (!canceled && filePaths.at(0)) ?? null;
		});
		// #endregion

		// #region Theme
		ipcMain.handle("theme:get", (): Theme => this._themeManager.getTheme());
		ipcMain.handle("theme:set", (_event, theme: Theme): void => {
			this._themeManager.setTheme(theme);
		});
		// #endregion

		// #region Vault
		ipcMain.handle("vault:new", async (): Promise<void> => {
			await this._vaultManager.newVault();
		});
		ipcMain.handle("vault:save", async (event): Promise<void> => {
			const filePath = this._vaultManager.vaultFilePath ?? (await this.selectVaultSavePath(event));
			if (filePath != null) {
				this._vaultManager.vaultFilePath = filePath;
				await this._vaultManager.saveVault();
			}
		});
		ipcMain.handle("vault:saveAs", async (event): Promise<void> => {
			const filePath = await this.selectVaultSavePath(event);
			if (filePath != null) {
				this._vaultManager.vaultFilePath = filePath;
				await this._vaultManager.saveVault();
			}
		});
		ipcMain.handle("vault:close", async (_event, force?: boolean): Promise<boolean> => {
			const canClose = force === true || !this._vaultManager.isDirty;
			if (canClose) {
				await this._vaultManager.closeVault();
			}
			return canClose;
		});
		// #endregion
	}

	private async selectVaultSavePath(event: IpcMainInvokeEvent): Promise<string | null> {
		const parent = BrowserWindow.fromWebContents(event.sender);
		const { canceled, filePath } = await (parent != null
			? dialog.showSaveDialog(parent, { filters: [{ name: "KDBX Vault", extensions: ["kdbx"] }] })
			: dialog.showSaveDialog({ filters: [{ name: "KDBX Vault", extensions: ["kdbx"] }] }));
		return (!canceled && filePath) || null;
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
