import { useState } from "react";
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
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle
} from "@/components/ui/alert-dialog";
import useThemeManager from "@renderer/hooks/useThemeManager";
import useVaultManager from "@renderer/hooks/useVaultManager";
import useObservableState from "@renderer/hooks/useObservableState";
import { Theme } from "@renderer/dependencies/managers/IThemeManager";
import { toast } from "@/components/ui/toast";

export default function VaultDropDownMenu() {
	const themeManager = useThemeManager();
	const vaultManager = useVaultManager();
	const theme = useObservableState(themeManager.change$, () => themeManager.theme);
	const [isLockDialogOpen, setIsLockDialogOpen] = useState(false);
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
				setIsLockDialogOpen(true);
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
		}
	};
	const onDiscardAndLockClick = async () => {
		try {
			await vaultManager.closeVault(true);
		} catch {
			toast.add({ type: "error", description: "Failed to lock vault." });
		}
	};
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
						<DropdownMenuItem onClick={() => void onLockClick()}>
							<Lock />
							Lock
							<DropdownMenuShortcut>Ctrl+L</DropdownMenuShortcut>
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
			<AlertDialog open={isLockDialogOpen} onOpenChange={setIsLockDialogOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle>Lock Vault</AlertDialogTitle>
						<AlertDialogDescription>The vault has unsaved changes. Do you want to save before locking?</AlertDialogDescription>
					</AlertDialogHeader>
					<AlertDialogFooter>
						<AlertDialogAction className="mr-auto" variant="destructive" onClick={() => void onDiscardAndLockClick()}>
							Discard Changes
						</AlertDialogAction>
						<AlertDialogAction onClick={() => void onSaveAndLockClick()}>Save</AlertDialogAction>
						<AlertDialogCancel>Cancel</AlertDialogCancel>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
		</>
	);
}
