import { TooltipProvider } from "./ui/tooltip";
import UnlockVaultView from "./UnlockVaultView";

export default function OneClickVault() {
	return (
		<TooltipProvider>
			<UnlockVaultView />
		</TooltipProvider>
	);
}
