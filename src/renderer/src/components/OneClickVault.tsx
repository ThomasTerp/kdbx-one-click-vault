import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVaultView from "./views/UnlockVaultView";
import VaultView from "./views/VaultView";
import useViewManager from "@renderer/hooks/useViewManager";
import useObservableState from "@renderer/hooks/useObservableState";

export default function OneClickVault() {
	const viewManager = useViewManager();
	const view = useObservableState(viewManager.change$, () => viewManager.view);
	const viewClassName = "min-h-screen select-none";
	let viewElement: React.ReactElement | null;
	switch (view) {
		case "unlock-vault":
			viewElement = <UnlockVaultView className={viewClassName} />;
			break;
		case "vault":
			viewElement = <VaultView className={viewClassName} />;
			break;
		default:
			viewElement = null;
			break;
	}
	return (
		<TooltipProvider>
			{viewElement}
			<Toaster />
		</TooltipProvider>
	);
}
