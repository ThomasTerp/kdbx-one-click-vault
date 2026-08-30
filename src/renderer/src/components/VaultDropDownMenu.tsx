import { Menu, Lock, Settings, Save, SavePen, Toolbox, CircleQuestionMark, Palette, Sun, Moon, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuRadioGroup,
	DropdownMenuRadioItem,
	DropdownMenuSeparator,
	DropdownMenuShortcut,
	DropdownMenuSub,
	DropdownMenuSubContent,
	DropdownMenuSubTrigger,
	DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import useViewManager from "@renderer/hooks/useViewManager";
import useThemeManager from "@renderer/hooks/useThemeManager";
import useObservableState from "@renderer/hooks/useObservableState";
import { Theme } from "@renderer/dependencies/managers/IThemeManager";

export default function VaultDropDownMenu() {
	const viewManager = useViewManager();
	const themeManager = useThemeManager();
	const theme = useObservableState(themeManager.change$, () => themeManager.theme);
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
					<DropdownMenuSub>
						<DropdownMenuSubTrigger>
							<Palette />
							Theme
						</DropdownMenuSubTrigger>
						<DropdownMenuSubContent>
							<DropdownMenuRadioGroup value={theme} onValueChange={(value) => void themeManager.setTheme(value as Theme)}>
								<DropdownMenuRadioItem value="system">
									<Monitor />
									System
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="light">
									<Sun />
									Light
								</DropdownMenuRadioItem>
								<DropdownMenuRadioItem value="dark">
									<Moon />
									Dark
								</DropdownMenuRadioItem>
							</DropdownMenuRadioGroup>
						</DropdownMenuSubContent>
					</DropdownMenuSub>
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
