import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVault from "./UnlockVault";
import Vault from "./Vault";
import useObservableState from "@renderer/hooks/useObservableState";
import useVaultManager from "@renderer/hooks/useVaultManager";
import VaultDataContext from "@renderer/contexts/VaultDataContext";

export default function OneClickVault() {
	const vaultManager = useVaultManager();
	const vaultData = useObservableState(vaultManager.change$, () => vaultManager.vaultData);
	const viewClassName = "min-h-screen select-none";
	return (
		<TooltipProvider>
			{vaultData == null ? (
				<UnlockVault className={viewClassName} />
			) : (
				<VaultDataContext.Provider value={vaultManager.vaultData}>
					<Vault className={viewClassName} />
				</VaultDataContext.Provider>
			)}
			<Toaster />
		</TooltipProvider>
	);
}
