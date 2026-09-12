import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultDropDownMenu from "@/components/VaultDropDownMenu";
import VaultSearch from "@/components/VaultSearch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import useVaultManager from "@renderer/hooks/useVaultManager";
import useObservableState from "@renderer/hooks/useObservableState";

export default function VaultHeader({ className, ...props }: React.ComponentProps<"header">) {
	const vaultManager = useVaultManager();
	const isDirty = useObservableState(vaultManager.change$, () => vaultManager.isDirty);
	const vaultName = useObservableState(vaultManager.change$, () => vaultManager.vaultName);
	return (
		<header className={cn("grid grid-cols-[auto_auto_1fr_auto] items-center gap-2 border-b p-2", className)} {...props}>
			<VaultDropDownMenu />
			<h1 className="min-w-16 text-base font-medium whitespace-nowrap mr-3 truncate">
				{vaultName}
				{isDirty ? "*" : ""}
			</h1>
			<VaultSearch className="min-w-40 max-w-xl xl:max-w-3xl mx-auto" />
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
