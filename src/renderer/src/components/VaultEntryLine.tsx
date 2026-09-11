import { VaultEntryData } from "../../../models/VaultEntryData";
import { cn } from "../lib/utils";
import VaultEntryFieldCopyButton from "./VaultEntryFieldCopyButton";

export default function VaultEntryLine({ entryData, className }: { entryData: VaultEntryData; className?: string }) {
	const { uuid, fields, fieldsOrder } = entryData;
	const titleField = fields.find((fieldData) => fieldData.name === "Title");
	const orderedFields = fields
		.filter((fieldData) => fieldData.name !== "Title" && (fieldData.isProtected || (fieldData.field != null && fieldData.field !== "")))
		.sort((fieldDataA, fieldDataB) => {
			const fieldDataAIndex = fieldsOrder.indexOf(fieldDataA.name);
			const fieldDataBIndex = fieldsOrder.indexOf(fieldDataB.name);
			return (fieldDataAIndex === -1 ? fieldsOrder.length : fieldDataAIndex) - (fieldDataBIndex === -1 ? fieldsOrder.length : fieldDataBIndex);
		});
	return (
		<div className={cn("flex flex-row flex-wrap gap-3 bg-card overflow-hidden rounded-xl ring-1 ring-foreground/10", className)}>
			{titleField != null && titleField.field !== null && titleField.field !== "" && (
				<div className="flex items-center px-3 py-1 text-sm font-semibold text-card-foreground">{titleField.field}</div>
			)}
			{orderedFields.map((entryFieldData, entryFieldDataIndex) => (
				<VaultEntryFieldCopyButton key={entryFieldDataIndex} entryUUID={uuid} entryFieldData={entryFieldData} />
			))}
		</div>
	);
}
