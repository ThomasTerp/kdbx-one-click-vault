import { useState } from "react";
import { Eye, EyeOff, FolderOpen, Unlock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupButton,
	InputGroupInput,
	InputGroupText
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export default function UnlockVaultView() {
	const [showPassword, setShowPassword] = useState(false);
	return (
		<div className="relative flex min-h-screen items-center justify-center p-4">
			<Card className="w-full max-w-sm">
				<CardHeader>
					<CardTitle>Unlock Vault</CardTitle>
					<CardDescription>Choose a vault to unlock.</CardDescription>
					<CardAction>
						<Tooltip>
							<TooltipTrigger
								render={
									<Button
										variant="outline"
										size="icon"
										type="button"
										aria-label="New vault"
									>
										<Plus />
									</Button>
								}
							/>
							<TooltipContent>New vault</TooltipContent>
						</Tooltip>
					</CardAction>
				</CardHeader>
				<CardContent className="flex flex-col gap-4">
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="vault-file">Vault file</Label>
						<InputGroup>
							<InputGroupInput id="vault-file" type="text" />
							<InputGroupAddon align="inline-end">
								<InputGroupText>.kdbx</InputGroupText>
								<Tooltip>
									<TooltipTrigger
										render={
											<InputGroupButton
												aria-label="Choose file"
												size="icon-xs"
											>
												<FolderOpen />
											</InputGroupButton>
										}
									/>
									<TooltipContent>Choose file</TooltipContent>
								</Tooltip>
							</InputGroupAddon>
						</InputGroup>
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="vault-password">Master password</Label>
						<InputGroup>
							<InputGroupInput
								id="vault-password"
								type={showPassword ? "text" : "password"}
							/>
							<InputGroupAddon align="inline-end">
								<Tooltip>
									<TooltipTrigger
										render={
											<InputGroupButton
												aria-label={
													showPassword ? "Hide password" : "Show password"
												}
												size="icon-xs"
												onClick={() => setShowPassword((prev) => !prev)}
											>
												{showPassword ? <Eye /> : <EyeOff />}
											</InputGroupButton>
										}
									/>
									<TooltipContent>
										{showPassword ? "Hide password" : "Show password"}
									</TooltipContent>
								</Tooltip>
							</InputGroupAddon>
						</InputGroup>
					</div>
					<div className="flex flex-col gap-1.5">
						<Label htmlFor="vault-keyfile">Key file</Label>
						<InputGroup>
							<InputGroupInput id="vault-keyfile" type="text" />
							<InputGroupAddon align="inline-end">
								<Tooltip>
									<TooltipTrigger
										render={
											<InputGroupButton
												aria-label="Choose key file"
												size="icon-xs"
											>
												<FolderOpen />
											</InputGroupButton>
										}
									/>
									<TooltipContent>Choose file</TooltipContent>
								</Tooltip>
							</InputGroupAddon>
						</InputGroup>
					</div>
				</CardContent>
				<CardFooter>
					<Button className="w-full" type="submit">
						<Unlock />
						Unlock
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
