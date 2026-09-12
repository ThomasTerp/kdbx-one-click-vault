import { useEffect, type ReactNode } from "react";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVault from "./UnlockVault";
import Vault from "./Vault";
import useVaultManager from "@renderer/hooks/useVaultManager";
import VaultDataContext from "@renderer/contexts/VaultDataContext";
import useObservableState from "@renderer/hooks/useObservableState";
import useThemeManager from "@renderer/hooks/useThemeManager";
import { TITLE } from "@renderer/global-constants";

const DARK_CLASS = "dark";
const CLASS_NAME = "h-screen select-none";

export default function OneClickVault() {
	const vaultManager = useVaultManager();
	const vaultData = useObservableState(vaultManager.change$, () => vaultManager.vaultData);
	const themeManager = useThemeManager();
	const isDark = useObservableState(themeManager.change$, () => themeManager.isDark);

	// #region Apply theme
	useEffect(() => {
		document.documentElement.classList.toggle(DARK_CLASS, isDark);
	}, [isDark]);
	// #endregion

	// #region Apply title
	useEffect(() => {
		const updateTitle = () => {
			document.title = `${vaultManager.vaultData != null ? `${vaultManager.vaultFilePath ?? ""}${vaultManager.isDirty ? "*" : ""} - ` : ""}${TITLE}`;
		};
		updateTitle();
		const subscription = vaultManager.change$.subscribe(() => {
			updateTitle();
		});
		return () => subscription.unsubscribe();
	}, [vaultManager]);
	// #endregion

	return (
		<Providers>
			{vaultData == null ? (
				<UnlockVault className={CLASS_NAME} />
			) : (
				<VaultDataContext.Provider value={vaultManager.vaultData}>
					<Vault className={CLASS_NAME} />
				</VaultDataContext.Provider>
			)}
			<Toaster />
		</Providers>
	);
}

function Providers({ children }: { children: ReactNode }) {
	return <TooltipProvider>{children}</TooltipProvider>;
}
