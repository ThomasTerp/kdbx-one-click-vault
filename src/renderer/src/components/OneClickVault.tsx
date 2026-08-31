import { useEffect } from "react";
import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVault from "./UnlockVault";
import Vault from "./Vault";
import useVaultManager from "@renderer/hooks/useVaultManager";
import VaultDataContext from "@renderer/contexts/VaultDataContext";
import useObservableState from "@renderer/hooks/useObservableState";
import useThemeManager from "@renderer/hooks/useThemeManager";

const TITLE = "One Click Vault";
const DARK_CLASS = "dark";
const CLASS_NAME = "min-h-screen select-none";

export default function OneClickVault() {
	const vaultManager = useVaultManager();
	const vaultData = useObservableState(vaultManager.change$, () => vaultManager.vaultData);
	const themeManager = useThemeManager();
	const isDark = useObservableState(themeManager.change$, () => themeManager.isDark);
	useEffect(() => {
		document.documentElement.classList.toggle(DARK_CLASS, isDark);
	}, [isDark]);
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
	return (
		<TooltipProvider>
			{vaultData == null ? (
				<UnlockVault className={CLASS_NAME} />
			) : (
				<VaultDataContext.Provider value={vaultManager.vaultData}>
					<Vault className={CLASS_NAME} />
				</VaultDataContext.Provider>
			)}
			<Toaster />
		</TooltipProvider>
	);
}
