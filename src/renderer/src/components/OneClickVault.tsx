import { TooltipProvider } from "./ui/tooltip";
import { Toaster } from "./ui/toast";
import UnlockVaultView from "./views/UnlockVaultView";
import { useState } from "react";
import VaultView from "./views/VaultView";

export default function OneClickVault() {
	const [isUnlocked, setIsUnlocked] = useState(false);
	return (
		<TooltipProvider>
			<div className="select-none">
				{isUnlocked ? <VaultView lockVault={() => setIsUnlocked(false)} /> : <UnlockVaultView unlockVault={() => setIsUnlocked(true)} />}
			</div>
			<Toaster />
		</TooltipProvider>
	);
}
