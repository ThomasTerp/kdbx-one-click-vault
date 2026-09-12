import kdbxweb from "kdbxweb";
import VaultGroupData from "../../models/VaultGroupData";

export default function getKDBXGroupEntries(
	group: kdbxweb.KdbxGroup,
	vaultGroupDataPath: VaultGroupData[] = []
): {
	entry: kdbxweb.KdbxEntry;
	vaultGroupDataPath: VaultGroupData[];
}[] {
	const currentVaultGroupDataPath = group.parentGroup != null ? [...vaultGroupDataPath, { uuid: group.uuid.id, name: group.name ?? "" }] : vaultGroupDataPath;
	const directEntries = group.entries.map((entry) => ({ entry, vaultGroupDataPath: currentVaultGroupDataPath }));
	const nestedEntries = group.groups.flatMap((subgroup) => getKDBXGroupEntries(subgroup, currentVaultGroupDataPath));
	return [...directEntries, ...nestedEntries];
}
