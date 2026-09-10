import { VaultEntryData } from "../../../models/VaultEntryData";
import { cn } from "../lib/utils";
import VaultEntryFieldCopyButton from "./VaultEntryFieldCopyButton";

export default function VaultEntryLine({ entryData, className }: { entryData: VaultEntryData; className?: string }) {
	const { uuid, fields, fieldsOrder } = entryData;
	const orderedFields = fields
		.filter((fieldData) => fieldData.isProtected || (fieldData.field != null && fieldData.field !== ""))
		.sort((fieldDataA, fieldDataB) => {
			const fieldDataAIndex = fieldsOrder.indexOf(fieldDataA.name);
			const fieldDataBIndex = fieldsOrder.indexOf(fieldDataB.name);
			return (fieldDataAIndex === -1 ? fieldsOrder.length : fieldDataAIndex) - (fieldDataBIndex === -1 ? fieldsOrder.length : fieldDataBIndex);
		});
	return (
		<div className={cn("flex flex-row flex-wrap gap-3 bg-card overflow-hidden rounded-xl ring-1 ring-foreground/10 p-2", className)}>
			{orderedFields.map((entryFieldData, entryFieldDataIndex) => {
				let fieldElement: React.ReactElement;
				switch (entryFieldData.name) {
					case "Title": {
						fieldElement = (
							<div key={entryFieldDataIndex} className="flex items-center px-3 py-1 text-sm font-semibold text-card-foreground">
								{entryFieldData.field}
							</div>
						);
						break;
					}
					default: {
						fieldElement = <VaultEntryFieldCopyButton key={entryFieldDataIndex} entryUUID={uuid} entryFieldData={entryFieldData} />;
					}
				}
				return fieldElement;
			})}
		</div>
	);
}
