import { ElectronAPI } from "@electron-toolkit/preload";
import type { Theme } from "../main/dependencies/managers/IThemeManager";

interface Api {
	selectFile: (title?: string, filters?: Electron.FileFilter[]) => Promise<string | null>;
	getTheme: () => Promise<Theme>;
	setTheme: (theme: Theme) => Promise<void>;
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: Api;
	}
}
