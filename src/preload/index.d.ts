import { ElectronAPI } from "@electron-toolkit/preload";
import type { Theme } from "../models/Theme";
import type { VaultData } from "../models/VaultData";
import type { UnlockFields } from "../models/UnlockFields";

interface Api {
	selectFile: (title?: string, filters?: Electron.FileFilter[]) => Promise<string | null>;
	getTheme: () => Promise<Theme>;
	setTheme: (theme: Theme) => Promise<void>;
	onThemeChanged: (callback: (theme: Theme) => void) => () => void;
	getUnlockFields: () => Promise<UnlockFields>;
	setUnlockFields: (unlockFields: UnlockFields) => Promise<void>;
	getVaultData: () => Promise<VaultData | null>;
	getIsDirty: () => Promise<boolean>;
	getVaultFilePath: () => Promise<string | null>;
	onVaultChanged: (callback: (vaultData: VaultData | null, isDirty: boolean, vaultFilePath: string | null) => void) => () => void;
	newVault: () => Promise<void>;
	loadVault: (vaultFilePathilePath: string, password: string | null, keyFilePath: string | null) => Promise<boolean>;
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
