import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVaultView from "./views/UnlockVaultView";
import VaultView from "./views/VaultView";
import useViewManager from "@renderer/hooks/useViewManager";
import useObservableState from "@renderer/hooks/useObservableState";

export default function OneClickVault() {
	const viewManager = useViewManager();
	const view = useObservableState(viewManager.change$, () => viewManager.view);
	let viewNode: React.JSX.Element | null;
	switch (view) {
		case "unlock-vault":
			viewNode = <UnlockVaultView />;
			break;
		case "vault":
			viewNode = <VaultView />;
			break;
		default:
			viewNode = null;
			break;
	}
	return (
		<TooltipProvider>
			<div className="select-none">{viewNode}</div>
			<Toaster />
		</TooltipProvider>
	);
}
