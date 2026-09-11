import * as React from "react";
import { cn } from "@/lib/utils";
import useVaultData from "@renderer/hooks/useVaultData";
import { VaultEntryData } from "../../../models/VaultEntryData";
import VaultGroupData from "../../../models/VaultGroupData";
import VaultEntryLine from "./VaultEntryLine";
import { Star } from "lucide-react";
import useObservableState from "@renderer/hooks/useObservableState";
import getFileNameFromPath from "@renderer/utilities/getFileNameFromPath";
import useVaultManager from "@renderer/hooks/useVaultManager";

const DEFAULT_VAULT_NAME = "Vault";
const FAVORITE_TAG = "Favorite";

export default function VaultEntryLines({ className, ...props }: React.ComponentProps<"div">) {
	const vaultData = useVaultData();
	const vaultManager = useVaultManager();
	const vaultFilePath = useObservableState(vaultManager.change$, () => vaultManager.vaultFilePath);
	const vaultFileName = getFileNameFromPath(vaultFilePath);
	const vaultName = vaultData.name !== "" ? vaultData.name : (vaultFileName ?? DEFAULT_VAULT_NAME);
	const entries = React.useMemo(
		() => vaultData.entries.filter((entryData) => !entryData.groupPath.some((group) => group.uuid === vaultData.recycleBinUUID)),
		[vaultData.entries, vaultData.recycleBinUUID]
	);
	const favoriteEntries = React.useMemo(() => entries.filter((entryData) => entryData.tags.includes(FAVORITE_TAG)), [entries]);
	const entryGroups = React.useMemo(() => {
		const groups: {
			groupPath: VaultGroupData[];
			entries: VaultEntryData[];
		}[] = [];
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
	}, [entries]);
	return (
		<div className={cn("flex flex-col gap-4", className)} {...props}>
			{favoriteEntries.length > 0 && (
				<div className="flex flex-col gap-3">
					<h2 className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground overflow-hidden text-nowrap">
						<Star className="size-4 fill-current" />
						Favorites
					</h2>
					{favoriteEntries.map((entryData, entryDataIndex) => (
						<VaultEntryLine key={entryDataIndex} className="w-full" entryData={entryData} />
					))}
				</div>
			)}
			{entryGroups.map((entryGroup, entryGroupIndex) => (
				<div key={entryGroupIndex} className="flex flex-col gap-3">
					<h2 className="text-sm font-medium text-muted-foreground overflow-hidden text-nowrap">
						{entryGroup.groupPath.length > 0 ? entryGroup.groupPath.map((group) => group.name).join(" → ") : vaultName}
					</h2>
					{entryGroup.entries.map((entryData, entryDataIndex) => (
						<VaultEntryLine key={entryDataIndex} className="w-full" entryData={entryData} />
					))}
				</div>
			))}
		</div>
	);
}
