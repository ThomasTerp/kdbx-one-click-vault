import { ElectronAPI } from "@electron-toolkit/preload";

interface Api {
	selectFile: (title?: string, filters?: Electron.FileFilter[]) => Promise<string | null>;
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: Api;
	}
}
