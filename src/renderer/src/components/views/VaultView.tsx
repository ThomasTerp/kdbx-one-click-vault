import { Menu, Lock, Search, Settings, Plus, Save, SavePen, Toolbox, CircleQuestionMark } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface UnlockVaultViewProps {
	lockVault: () => void;
}

export default function VaultView({ lockVault }: UnlockVaultViewProps) {
	return (
		<div className="flex min-h-screen flex-col">
			<header className="flex items-center gap-2 border-b p-2">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button variant="ghost" size="icon" aria-label="Menu">
								<Menu />
							</Button>
						}
					/>
					<DropdownMenuContent className="w-46">
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Save />
								Save
								<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
							</DropdownMenuItem>
							<DropdownMenuItem>
								<SavePen />
								Save As…
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Toolbox />
								Tools
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Settings />
								Settings
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<CircleQuestionMark />
								About
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem onClick={lockVault}>
								<Lock />
								Lock
								<DropdownMenuShortcut>Ctrl+L</DropdownMenuShortcut>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
				<h1 className="text-base font-medium whitespace-nowrap">My Vault</h1>
				<InputGroup className="max-w-xl mx-auto">
					<InputGroupInput placeholder="Search…" />
					<InputGroupAddon align="inline-start">
						<Search className="text-muted-foreground" />
					</InputGroupAddon>
				</InputGroup>
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
		</div>
	);
}
