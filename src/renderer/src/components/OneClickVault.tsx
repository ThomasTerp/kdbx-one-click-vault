import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVaultView from "./UnlockVaultView";

export default function OneClickVault() {
	return (
		<TooltipProvider>
			<UnlockVaultView />
			<Toaster />
		</TooltipProvider>
	);
}
