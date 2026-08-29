import * as React from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import VaultDropDownMenu from "@/components/VaultDropDownMenu";
import VaultSearch from "@/components/VaultSearch";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function VaultHeader({ className, ...props }: React.ComponentProps<"header">) {
	return (
		<header className={cn("flex items-center gap-2 border-b p-2", className)} {...props}>
			<VaultDropDownMenu />
			<h1 className="text-base font-medium whitespace-nowrap">My Vault</h1>
			<VaultSearch className="max-w-xl mx-auto" />
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
