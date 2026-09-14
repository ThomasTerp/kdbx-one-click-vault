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
	const favoriteVaultEntriesData = React.useMemo(
		() => vaultEntriesData.filter((entryData) => entryData.tags.includes(FAVORITE_TAG)).toSorted(compareVaultEntryDataByTitle),
		[vaultEntriesData]
	);
	const groupWithEntries = React.useMemo(() => {
		const groupsWithEntries: {
			vaultGroupDataPath: VaultGroupData[];
			vaultEntriesData: VaultEntryData[];
		}[] = [];
		for (const entryData of vaultEntriesData) {
			const existingGroupWithEntries = groupsWithEntries.find(
				(groupWithEntries) =>
					groupWithEntries.vaultGroupDataPath.length === entryData.groupPath.length &&
					groupWithEntries.vaultGroupDataPath.every(
						(vaultGroupDataGroup, vaultGroupDataGroupIndex) => vaultGroupDataGroup.uuid === entryData.groupPath[vaultGroupDataGroupIndex].uuid
					)
			);
			if (existingGroupWithEntries) {
				existingGroupWithEntries.vaultEntriesData.push(entryData);
			} else {
				groupsWithEntries.push({ vaultGroupDataPath: entryData.groupPath, vaultEntriesData: [entryData] });
			}
		}
		for (const groupWithEntries of groupsWithEntries) {
			groupWithEntries.vaultEntriesData = groupWithEntries.vaultEntriesData.toSorted(compareVaultEntryDataByTitle);
		}
		return groupsWithEntries;
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

function compareVaultEntryDataByTitle(entryDataA: VaultEntryData, entryDataB: VaultEntryData): number {
	const titleA = getVaultEntryDataTitle(entryDataA);
	const titleB = getVaultEntryDataTitle(entryDataB);
	return titleA === "" && titleB === "" ? 0 : titleA === "" ? 1 : titleB === "" ? -1 : titleA.localeCompare(titleB);
}

function getVaultEntryDataTitle(entryData: VaultEntryData): string {
	const titleField = entryData.fields.find((fieldData) => fieldData.name === "Title");
	return titleField?.field ?? "";
}
