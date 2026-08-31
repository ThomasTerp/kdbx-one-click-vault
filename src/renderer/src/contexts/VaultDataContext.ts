import { VaultData } from "@renderer/dependencies/managers/IVaultManager";
import { createContext } from "react";

const VaultDataContext = createContext<VaultData | null>(null);
export default VaultDataContext;
