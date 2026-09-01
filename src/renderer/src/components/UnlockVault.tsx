import * as React from "react";
import { useState } from "react";
import { Eye, EyeOff, FolderOpen, Unlock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useShake } from "@/hooks/useShake";
import { cn } from "@/lib/utils";
import useVaultManager from "@renderer/hooks/useVaultManager";
import { toast } from "./ui/toast";

export default function UnlockVault({ className, ...props }: React.ComponentProps<"div">) {
	const vaultManager = useVaultManager();
	const [vaultFilePath, setVaultFilePath] = useState("");
	const [masterPassword, setMasterPassword] = useState("");
	const [showMasterPassword, setShowMasterPassword] = useState(false);
	const [keyFilePath, setKeyFilePath] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoadingVault, setIsLoadingVault] = useState(false);
	const [isCredentialsInvalid, setIsCredentialsInvalid] = useState(false);
	const [isVaultFileInvalid, setIsVaultFileInvalid] = useState(false);
	const [shake, stopShaking, shakeClassName] = useShake();
	const isVaultFileEmpty = vaultFilePath === "";
	const isCredentialsEmpty = masterPassword === "" && keyFilePath === "";
	const vaultFileErrors = [...(isVaultFileEmpty ? ["Vault file is required."] : []), ...(isVaultFileInvalid ? ["Failed to load vault file."] : [])];
	const credentialErrors = [
		...(isCredentialsEmpty ? ["Master password and/or key file is required."] : []),
		...(isCredentialsInvalid ? ["Master password and/or key file is incorrect."] : [])
	];
	const onChooseVaultFileClick = async () => {
		const filePath = await window.api.selectFile("Select Vault File", [
			{ name: "KeePass KDBX Files", extensions: ["kdbx"] },
			{ name: "All Files", extensions: ["*"] }
		]);
		if (filePath != null) {
			setVaultFilePath(filePath);
			setIsVaultFileInvalid(false);
		}
	};
	const onChooseKeyFileClick = async () => {
		const filePath = await window.api.selectFile("Select Key File", [
			{ name: "Key Files", extensions: ["keyx", "key"] },
			{ name: "All Files", extensions: ["*"] }
		]);
		if (filePath != null) {
			setKeyFilePath(filePath);
			setIsCredentialsInvalid(false);
		}
	};
	const onNewVaultClick = async () => {
		try {
			await vaultManager.newVault();
		} catch {
			toast.add({ type: "error", description: "Failed to create new vault." });
		}
	};
	const onUnlockClick = async () => {
		setIsSubmitted(true);
		if (isVaultFileEmpty || isCredentialsEmpty) {
			shake();
		} else {
			stopShaking();
			setShowMasterPassword(false);
			setIsLoadingVault(true);
			try {
				const isLoaded = await vaultManager.loadVault(vaultFilePath, masterPassword, keyFilePath !== "" ? keyFilePath : null);
				setIsLoadingVault(false);
				setIsCredentialsInvalid(!isLoaded);
				setIsVaultFileInvalid(false);
				if (!isLoaded) {
					shake();
				}
			} catch {
				setIsLoadingVault(false);
				setIsVaultFileInvalid(true);
				shake();
			}
		}
	};
	return (
		<div className={cn("flex items-center justify-center p-4", className)} {...props}>
			<Card className={cn("w-full min-w-3xs max-w-sm", shakeClassName)} onAnimationEnd={stopShaking}>
				<fieldset disabled={isLoadingVault} className="contents">
					<CardHeader>
						<CardTitle>Unlock Vault</CardTitle>
						<CardDescription>Choose a vault to unlock.</CardDescription>
						<CardAction>
							<Tooltip>
								<TooltipTrigger
									render={
										<Button variant="outline" size="icon" type="button" aria-label="New Vault" onClick={() => void onNewVaultClick()}>
											<Plus />
										</Button>
									}
								/>
								<TooltipContent>New Vault</TooltipContent>
							</Tooltip>
						</CardAction>
					</CardHeader>
					<CardContent>
						<FieldGroup className="gap-3">
							<Field data-invalid={isSubmitted && vaultFileErrors.length > 0}>
								<FieldLabel>Vault file</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type="text"
										aria-invalid={isSubmitted && vaultFileErrors.length > 0}
										value={vaultFilePath}
										onChange={(e) => {
											setVaultFilePath(e.target.value);
											setIsVaultFileInvalid(false);
										}}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton
														aria-label="Choose vault file"
														size="icon-xs"
														onClick={() => void onChooseVaultFileClick()}
													>
														<FolderOpen />
													</InputGroupButton>
												}
											/>
											<TooltipContent>Choose File</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
								{isSubmitted && vaultFileErrors.length > 0 && <FieldError errors={vaultFileErrors.map((e) => ({ message: e }))} />}
							</Field>
							<Field data-invalid={isSubmitted && credentialErrors.length > 0}>
								<FieldLabel>Master password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type={showMasterPassword ? "text" : "password"}
										aria-invalid={isSubmitted && credentialErrors.length > 0}
										value={masterPassword}
										onChange={(e) => {
											setMasterPassword(e.target.value);
											setIsCredentialsInvalid(false);
										}}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton
														aria-label={showMasterPassword ? "Hide Master Password" : "Show Master Password"}
														size="icon-xs"
														onClick={() => setShowMasterPassword((prev) => !prev)}
													>
														{showMasterPassword ? <Eye /> : <EyeOff />}
													</InputGroupButton>
												}
											/>
											<TooltipContent>{showMasterPassword ? "Hide Password" : "Show Password"}</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
								{isSubmitted && credentialErrors.length > 0 && <FieldError errors={credentialErrors.map((e) => ({ message: e }))} />}
							</Field>
							<Field data-invalid={isSubmitted && credentialErrors.length > 0}>
								<FieldLabel>Key file</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type="text"
										aria-invalid={isSubmitted && credentialErrors.length > 0}
										value={keyFilePath}
										onChange={(e) => {
											setKeyFilePath(e.target.value);
											setIsCredentialsInvalid(false);
										}}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton aria-label="Choose Key File" size="icon-xs" onClick={() => void onChooseKeyFileClick()}>
														<FolderOpen />
													</InputGroupButton>
												}
											/>
											<TooltipContent>Choose File</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						</FieldGroup>
					</CardContent>
					<CardFooter>
						<Button className="w-full" onClick={() => void onUnlockClick()}>
							{isLoadingVault ? <Spinner data-icon="inline-start" /> : <Unlock data-icon="inline-start" />}
							{isLoadingVault ? "Unlocking…" : "Unlock"}
						</Button>
					</CardFooter>
				</fieldset>
			</Card>
		</div>
	);
}
