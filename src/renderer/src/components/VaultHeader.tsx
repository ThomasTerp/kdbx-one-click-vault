import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultDropDownMenu from "@/components/VaultDropDownMenu";
import VaultSearch from "@/components/VaultSearch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function VaultHeader() {
	return (
		<header className="flex items-center gap-2 border-b p-2">
			<VaultDropDownMenu />
			<h1 className="text-base font-medium whitespace-nowrap">My Vault</h1>
			<VaultSearch />
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
