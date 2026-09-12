import * as React from "react";
import { cn } from "@/lib/utils";
import { VaultEntryData } from "../../../models/VaultEntryData";
import VaultEntryLine from "./VaultEntryLine";

export type VaultGroupProps = {
	title: string;
	icon?: React.ReactNode;
	vaultEntriesData: VaultEntryData[];
} & Omit<React.ComponentProps<"div">, "title">;

export default function VaultEntryLinesGroup({ title, icon, vaultEntriesData, className, ...props }: VaultGroupProps) {
	return (
		<div className={cn("flex flex-col gap-2", className)} {...props}>
			<h2 className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground overflow-hidden text-nowrap">
				{icon}
				{title}
			</h2>
			<div className="flex flex-col gap-3">
				{vaultEntriesData.map((vaultEntryData, vaultEntryDataIndex) => (
					<VaultEntryLine key={vaultEntryDataIndex} className="w-full" entryData={vaultEntryData} />
				))}
			</div>
		</div>
	);
}
