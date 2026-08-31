import { useContext } from "react";
import VaultManagerContext from "../contexts/VaultManagerContext";
import IVaultManager from "@renderer/dependencies/managers/IVaultManager";

export default function useVaultManager(): IVaultManager {
	const context = useContext(VaultManagerContext);
	if (context == null) {
		throw new Error("Vault manager provider is missing");
	}
	return context;
}
