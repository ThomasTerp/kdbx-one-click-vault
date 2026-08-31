import { ElectronAPI } from "@electron-toolkit/preload";
import type { Theme } from "../models/Theme";
import type { VaultData } from "../models/VaultData";

interface Api {
	selectFile: (title?: string, filters?: Electron.FileFilter[]) => Promise<string | null>;
	getTheme: () => Promise<Theme>;
	setTheme: (theme: Theme) => Promise<void>;
	onThemeChanged: (callback: (theme: Theme) => void) => () => void;
	getVaultData: () => Promise<VaultData | null>;
	getIsDirty: () => Promise<boolean>;
	getVaultFilePath: () => Promise<string | null>;
	onVaultChanged: (callback: (vaultData: VaultData | null, isDirty: boolean, vaultFilePath: string | null) => void) => () => void;
	newVault: () => Promise<void>;
	saveVault: () => Promise<void>;
	saveVaultAs: () => Promise<void>;
	closeVault: (force?: boolean) => Promise<boolean>;
}

declare global {
	interface Window {
		electron: ElectronAPI;
		api: Api;
	}
}
