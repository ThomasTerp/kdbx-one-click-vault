import { useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "./ui/dialog";
import { Field, FieldGroup, FieldLabel } from "./ui/field";
import { InputGroup, InputGroupInput } from "./ui/input-group";
import SaveAlertDialog from "./SaveAlertDialog";
import useVaultData from "@renderer/hooks/useVaultData";

interface VaultSettingsDialogProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
}

export default function VaultSettingsDialog({ open, onOpenChange }: VaultSettingsDialogProps) {
	const vaultData = useVaultData();
	const [saveAlertOpen, setSaveAlertOpen] = useState(false);
	const [draftVaultName, setDraftVaultName] = useState(vaultData.name);
	const [isDirty, setIsDirty] = useState(false);
	return (
		<>
			<Dialog
				open={open}
				onOpenChange={(open, eventDetails) => {
					if (eventDetails.reason !== "close-press" && isDirty) {
						eventDetails.cancel();
						setSaveAlertOpen(true);
					} else {
						onOpenChange(open);
					}
				}}
			>
				<DialogContent className="sm:max-w-xl xl:max-w-2xl" showCloseButton={false}>
					<DialogHeader>
						<DialogTitle>Vault Settings</DialogTitle>
					</DialogHeader>
					<FieldGroup>
						<Field>
							<FieldLabel>Vault name</FieldLabel>
							<InputGroup>
								<InputGroupInput
									type="text"
									value={draftVaultName}
									onChange={(e) => {
										setDraftVaultName(e.target.value);
										setIsDirty(true);
									}}
								/>
							</InputGroup>
						</Field>
					</FieldGroup>
					<DialogFooter>
						<DialogClose render={<Button variant="outline">Cancel</Button>} />
						<DialogClose render={<Button>Save</Button>} />
					</DialogFooter>
				</DialogContent>
			</Dialog>
			<SaveAlertDialog
				open={saveAlertOpen}
				onOpenChange={setSaveAlertOpen}
				title="Save Vault Settings"
				description="There are unsaved vault settings. Do you want to save before closing?"
				onDiscard={() => {
					setSaveAlertOpen(false);
					onOpenChange(false);
				}}
				onSave={() => {}}
			/>
		</>
	);
}
