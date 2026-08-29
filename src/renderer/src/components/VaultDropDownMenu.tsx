import { Menu, Lock, Settings, Save, SavePen, Toolbox, CircleQuestionMark } from "lucide-react";
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
import useViewManager from "@renderer/hooks/useViewManager";

export default function VaultDropDownMenu() {
	const viewManager = useViewManager();
	return (
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
					<DropdownMenuItem onClick={() => viewManager.setView("unlock-vault")}>
						<Lock />
						Lock
						<DropdownMenuShortcut>Ctrl+L</DropdownMenuShortcut>
					</DropdownMenuItem>
				</DropdownMenuGroup>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
