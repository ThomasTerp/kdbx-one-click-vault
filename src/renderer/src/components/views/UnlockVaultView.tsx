import { useState } from "react";
import { Eye, EyeOff, FolderOpen, Unlock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { InputGroup, InputGroupAddon, InputGroupButton, InputGroupInput } from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

interface UnlockVaultViewProps {
	unlockVault: () => void;
}

export default function UnlockVaultView({ unlockVault }: UnlockVaultViewProps) {
	const [vaultFilePath, setVaultFilePath] = useState("");
	const [masterPassword, setMasterPassword] = useState("");
	const [showMasterPassword, setShowMasterPassword] = useState(false);
	const [keyFilePath, setKeyFilePath] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoadingVault, setIsLoadingVault] = useState(false);
	const [shake, setShake] = useState(false);
	const isVaultFileEmpty = vaultFilePath === "";
	const isCredentialsEmpty = masterPassword === "" && keyFilePath === "";
	const isVaultFileInvalid = isSubmitted && isVaultFileEmpty;
	const isCredentialsInvalid = isSubmitted && isCredentialsEmpty;
	const onChooseVaultFileClick = async () => {
		const filePath = await window.api.selectFile([{ name: "KeePass vault", extensions: ["kdbx"] }]);
		if (filePath != null) {
			setVaultFilePath(filePath);
		}
	};
	const onChooseKeyFileClick = async () => {
		const filePath = await window.api.selectFile([
			{ name: "Key files", extensions: ["keyx", "key"] },
			{ name: "All files", extensions: ["*"] }
		]);
		if (filePath != null) {
			setKeyFilePath(filePath);
		}
	};
	const onNewVaultClick = () => {
		unlockVault();
	};
	const onUnlockClick = () => {
		setIsSubmitted(true);
		if (isVaultFileEmpty || isCredentialsEmpty) {
			setShake(false);
			requestAnimationFrame(() => setShake(true));
		} else {
			setShowMasterPassword(false);
			setIsLoadingVault(true);
		}
	};
	return (
		<div className="flex min-h-screen items-center justify-center p-4">
			<Card className={cn("w-full min-w-3xs max-w-sm", shake && "animate-shake")} onAnimationEnd={() => setShake(false)}>
				<fieldset disabled={isLoadingVault} className="contents">
					<CardHeader>
						<CardTitle>Unlock Vault</CardTitle>
						<CardDescription>Choose a vault to unlock.</CardDescription>
						<CardAction>
							<Tooltip>
								<TooltipTrigger
									render={
										<Button variant="outline" size="icon" type="button" aria-label="New vault" onClick={onNewVaultClick}>
											<Plus />
										</Button>
									}
								/>
								<TooltipContent>New vault</TooltipContent>
							</Tooltip>
						</CardAction>
					</CardHeader>
					<CardContent>
						<FieldGroup className="gap-3">
							<Field data-invalid={isVaultFileInvalid}>
								<FieldLabel>Vault file</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type="text"
										aria-invalid={isVaultFileInvalid}
										value={vaultFilePath}
										onChange={(e) => setVaultFilePath(e.target.value)}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton aria-label="Choose file" size="icon-xs" onClick={() => void onChooseVaultFileClick()}>
														<FolderOpen />
													</InputGroupButton>
												}
											/>
											<TooltipContent>Choose file</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
								{isVaultFileInvalid && <FieldError errors={[{ message: "Vault file is required." }]} />}
							</Field>
							<Field data-invalid={isCredentialsInvalid}>
								<FieldLabel>Master password</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type={showMasterPassword ? "text" : "password"}
										aria-invalid={isCredentialsInvalid}
										value={masterPassword}
										onChange={(e) => setMasterPassword(e.target.value)}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton
														aria-label={showMasterPassword ? "Hide password" : "Show password"}
														size="icon-xs"
														onClick={() => setShowMasterPassword((prev) => !prev)}
													>
														{showMasterPassword ? <Eye /> : <EyeOff />}
													</InputGroupButton>
												}
											/>
											<TooltipContent>{showMasterPassword ? "Hide password" : "Show password"}</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
								{isCredentialsInvalid && (
									<FieldError
										errors={[
											{
												message: "Master password and/or key file is required."
											}
										]}
									/>
								)}
							</Field>
							<Field data-invalid={isCredentialsInvalid}>
								<FieldLabel>Key file</FieldLabel>
								<InputGroup>
									<InputGroupInput
										type="text"
										aria-invalid={isCredentialsInvalid}
										value={keyFilePath}
										onChange={(e) => setKeyFilePath(e.target.value)}
									/>
									<InputGroupAddon align="inline-end">
										<Tooltip>
											<TooltipTrigger
												render={
													<InputGroupButton aria-label="Choose key file" size="icon-xs" onClick={() => void onChooseKeyFileClick()}>
														<FolderOpen />
													</InputGroupButton>
												}
											/>
											<TooltipContent>Choose file</TooltipContent>
										</Tooltip>
									</InputGroupAddon>
								</InputGroup>
							</Field>
						</FieldGroup>
					</CardContent>
					<CardFooter>
						<Button className="w-full" onClick={onUnlockClick}>
							{isLoadingVault ? <Spinner data-icon="inline-start" /> : <Unlock data-icon="inline-start" />}
							{isLoadingVault ? "Unlocking…" : "Unlock"}
						</Button>
					</CardFooter>
				</fieldset>
			</Card>
		</div>
	);
}
