import * as React from "react";
import { cn } from "@/lib/utils";
import useVaultData from "@renderer/hooks/useVaultData";
import { VaultEntryData } from "../../../models/VaultEntryData";
import VaultGroupData from "../../../models/VaultGroupData";
import VaultEntryLinesGroup from "./VaultEntryLinesGroup";
import { Star } from "lucide-react";
import useObservableState from "@renderer/hooks/useObservableState";
import useVaultManager from "@renderer/hooks/useVaultManager";
import { FAVORITE_TAG } from "@renderer/global-constants";

const GROUP_PATH_SEPARATOR = " → ";

export default function VaultEntryLines({ className, ...props }: React.ComponentProps<"div">) {
	const vaultData = useVaultData();
	const vaultManager = useVaultManager();
	const vaultName = useObservableState(vaultManager.change$, () => vaultManager.vaultName);
	const vaultEntriesData = React.useMemo(
		() => vaultData.entries.filter((entryData) => !entryData.groupPath.some((vaultGroupData) => vaultGroupData.uuid === vaultData.recycleBinUUID)),
		[vaultData.entries, vaultData.recycleBinUUID]
	);
	const favoriteVaultEntriesData = React.useMemo(() => vaultEntriesData.filter((entryData) => entryData.tags.includes(FAVORITE_TAG)), [vaultEntriesData]);
	const groupWithEntries = React.useMemo(() => {
		const groupWithEntries: {
			vaultGroupDataPath: VaultGroupData[];
			vaultEntriesData: VaultEntryData[];
		}[] = [];
		for (const entryData of vaultEntriesData) {
			const existingGroupWithEntries = groupWithEntries.find(
				(groupWithEntries2) =>
					groupWithEntries2.vaultGroupDataPath.length === entryData.groupPath.length &&
					groupWithEntries2.vaultGroupDataPath.every(
						(vaultGroupDataGroup, vaultGroupDataGroupIndex) => vaultGroupDataGroup.uuid === entryData.groupPath[vaultGroupDataGroupIndex].uuid
					)
			);
			if (existingGroupWithEntries) {
				existingGroupWithEntries.vaultEntriesData.push(entryData);
			} else {
				groupWithEntries.push({ vaultGroupDataPath: entryData.groupPath, vaultEntriesData: [entryData] });
			}
		}
		return groupWithEntries;
	}, [vaultEntriesData]);
	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			{favoriteVaultEntriesData.length > 0 && (
				<VaultEntryLinesGroup title="Favorites" icon={<Star className="size-4 fill-current" />} vaultEntriesData={favoriteVaultEntriesData} />
			)}
			{groupWithEntries.map((entryGroup, entryGroupIndex) => (
				<VaultEntryLinesGroup
					key={entryGroupIndex}
					title={
						entryGroup.vaultGroupDataPath.length > 0
							? entryGroup.vaultGroupDataPath.map((group) => group.name).join(GROUP_PATH_SEPARATOR)
							: vaultName
					}
					vaultEntriesData={entryGroup.vaultEntriesData}
				/>
			))}
		</div>
	);
}
