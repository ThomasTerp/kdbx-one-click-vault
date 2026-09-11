import * as React from "react";

import { cn } from "@/lib/utils";
import useVaultData from "@renderer/hooks/useVaultData";
import { VaultEntryData } from "../../../models/VaultEntryData";
import VaultGroupData from "../../../models/VaultGroupData";
import VaultEntryLine from "./VaultEntryLine";

export default function VaultEntryLines({ className, ...props }: React.ComponentProps<"div">) {
	const vaultData = useVaultData();
	const entryGroups = React.useMemo(() => {
		const groups: {
			groupPath: VaultGroupData[];
			entries: VaultEntryData[];
		}[] = [];
		const entries = vaultData.entries.filter((entryData) => !entryData.groupPath.some((group) => group.uuid === vaultData.recycleBinUUID));
		for (const entryData of entries) {
			const existingGroup = groups.find(
				(group) =>
					group.groupPath.length === entryData.groupPath.length &&
					group.groupPath.every((groupPathGroup, groupPathGroupIndex) => groupPathGroup.uuid === entryData.groupPath[groupPathGroupIndex].uuid)
			);
			if (existingGroup) {
				existingGroup.entries.push(entryData);
			} else {
				groups.push({ groupPath: entryData.groupPath, entries: [entryData] });
			}
		}
		return groups;
	}, [vaultData.entries, vaultData.recycleBinUUID]);
	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			{entryGroups.map((entryGroup, entryGroupIndex) => (
				<div key={entryGroupIndex} className="flex flex-col gap-3">
					{entryGroup.groupPath.length > 0 && (
						<h2 className="text-sm font-medium text-muted-foreground overflow-hidden text-nowrap">
							{entryGroup.groupPath.map((group) => group.name).join(" → ")}
						</h2>
					)}
					{entryGroup.entries.map((entryData, entryDataIndex) => (
						<VaultEntryLine key={entryDataIndex} className="w-full" entryData={entryData} />
					))}
				</div>
			))}
		</div>
	);
}
