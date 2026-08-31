import { useContext } from "react";
import VaultDataContext from "../contexts/VaultDataContext";
import { VaultData } from "@renderer/dependencies/managers/IVaultManager";

export default function useVaultData(): VaultData {
	const context = useContext(VaultDataContext);
	if (context == null) {
		throw new Error("Vault data provider is missing");
	}
	return context;
}
