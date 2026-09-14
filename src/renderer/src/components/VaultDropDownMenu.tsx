import { useState } from "react";
import { Menu, Lock, Settings, Save, SavePen, Toolbox, Palette, Sun, Moon, Monitor, Settings2 } from "lucide-react";
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
import useThemeManager from "@renderer/hooks/useThemeManager";
import useVaultManager from "@renderer/hooks/useVaultManager";
import useObservableState from "@renderer/hooks/useObservableState";
import { Theme } from "@renderer/dependencies/managers/IThemeManager";
import { toast } from "@/components/ui/toast";
import VaultSettingsDialog from "./VaultSettingsDialog";
import SaveAlertDialog from "./SaveAlertDialog";

export default function VaultDropDownMenu() {
	const themeManager = useThemeManager();
	const vaultManager = useVaultManager();
	const theme = useObservableState(themeManager.change$, () => themeManager.theme);
	const [isSaveAlertOpen, setIsSaveAlertOpen] = useState(false);
	const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

	// #region Events
	const onSaveClick = async () => {
		try {
			await vaultManager.saveVault();
		} catch {
			toast.add({ type: "error", description: "Failed to save vault." });
		}
	};
	const onSaveAsClick = async () => {
		try {
			await vaultManager.saveVaultAs();
		} catch {
			toast.add({ type: "error", description: "Failed to save vault." });
		}
	};
	const onLockClick = async () => {
		try {
			const canClose = await vaultManager.closeVault();
			if (!canClose) {
				setIsSaveAlertOpen(true);
			}
		} catch {
			toast.add({ type: "error", description: "Failed to lock vault." });
		}
	};
	const onSaveAndLockClick = async () => {
		try {
			await vaultManager.saveVault();
			try {
				await vaultManager.closeVault(true);
			} catch {
				toast.add({ type: "error", description: "Failed to lock vault." });
			}
		} catch {
			toast.add({ type: "error", description: "Failed to save vault." });
		} finally {
			setIsSaveAlertOpen(false);
		}
	};
	const onDiscardAndLockClick = async () => {
		try {
			await vaultManager.closeVault(true);
		} catch {
			toast.add({ type: "error", description: "Failed to lock vault." });
		} finally {
			setIsSaveAlertOpen(false);
		}
	};
	// #endregion

	return (
		<>
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
						<DropdownMenuItem onClick={() => void onSaveClick()}>
							<Save />
							Save
							<DropdownMenuShortcut>Ctrl+S</DropdownMenuShortcut>
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => void onSaveAsClick()}>
							<SavePen />
							Save As
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem>
							<Toolbox />
							Tools
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
						<DropdownMenuItem onClick={() => setIsSettingsDialogOpen(true)}>
							<Settings2 />
							Vault Settings
						</DropdownMenuItem>
						<DropdownMenuItem>
							<Settings />
							Options
						</DropdownMenuItem>
					</DropdownMenuGroup>
					<DropdownMenuSeparator />
					<DropdownMenuGroup>
						<DropdownMenuItem onClick={() => void onLockClick()}>
							<Lock />
							Lock
							<DropdownMenuShortcut>Ctrl+L</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<VaultSettingsDialog open={isSettingsDialogOpen} onOpenChange={setIsSettingsDialogOpen} />
			<SaveAlertDialog
				open={isSaveAlertOpen}
				onOpenChange={setIsSaveAlertOpen}
				title="Lock Vault"
				description="The vault has unsaved changes. Do you want to save before locking?"
				onDiscard={() => void onDiscardAndLockClick()}
				onSave={() => void onSaveAndLockClick()}
			/>
		</>
	);
}
