import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultDropDownMenu from "@/components/VaultDropDownMenu";
import VaultSearch from "@/components/VaultSearch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import getFileNameFromPath from "@/utilities/getFileNameFromPath";
import useVaultData from "@renderer/hooks/useVaultData";
import useVaultManager from "@renderer/hooks/useVaultManager";
import useObservableState from "@renderer/hooks/useObservableState";

const DEFAULT_VAULT_NAME = "Vault";

export default function VaultHeader({ className, ...props }: React.ComponentProps<"header">) {
	const vaultManager = useVaultManager();
	const isDirty = useObservableState(vaultManager.change$, () => vaultManager.isDirty);
	const vaultFilePath = useObservableState(vaultManager.change$, () => vaultManager.vaultFilePath);
	const vaultFileName = getFileNameFromPath(vaultFilePath);
	const vaultData = useVaultData();
	const vaultName = vaultData.name !== "" ? vaultData.name : (vaultFileName ?? DEFAULT_VAULT_NAME);
	return (
		<header className={cn("flex items-center gap-2 border-b p-2", className)} {...props}>
			<VaultDropDownMenu />
			<h1 className="text-base font-medium whitespace-nowrap mr-3">
				{vaultName}
				{isDirty ? "*" : ""}
			</h1>
			<VaultSearch className="max-w-xl xl:max-w-3xl mx-auto" />
			<Tooltip>
				<TooltipTrigger
					render={
						<Button variant="ghost" size="icon" aria-label="New Entry">
							<Plus />
						</Button>
					}
				/>
				<TooltipContent>New Entry</TooltipContent>
			</Tooltip>
		</header>
	);
}
