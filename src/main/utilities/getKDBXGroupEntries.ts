import kdbxweb from "kdbxweb";
import VaultGroupData from "../../models/VaultGroupData";

export interface KDBXGroupEntry {
	entry: kdbxweb.KdbxEntry;
	groupPath: VaultGroupData[];
}

export default function getKDBXGroupEntries(group: kdbxweb.KdbxGroup, groupPath: VaultGroupData[] = []): KDBXGroupEntry[] {
	const currentGroupPath = group.parentGroup != null ? [...groupPath, { uuid: group.uuid.id, name: group.name ?? "" }] : groupPath;
	const directEntries = group.entries.map((entry) => ({ entry, groupPath: currentGroupPath }));
	const nestedEntries = group.groups.flatMap((subgroup) => getKDBXGroupEntries(subgroup, currentGroupPath));
	return [...directEntries, ...nestedEntries];
}
