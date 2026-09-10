import { VaultEntryFieldData } from "./VaultEntryFieldData";
import VaultGroupData from "./VaultGroupData";

export interface VaultEntryData {
	uuid: string;
	groupPath: VaultGroupData[];
	fields: VaultEntryFieldData[];
	fieldsOrder: string[];
}
