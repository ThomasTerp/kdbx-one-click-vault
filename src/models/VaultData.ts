import { VaultEntryData } from "./VaultEntryData";

export interface VaultData {
	name: string;
	recycleBinUUID: string | undefined;
	entries: VaultEntryData[];
}
