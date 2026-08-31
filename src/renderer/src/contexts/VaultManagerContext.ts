import IVaultManager from "@renderer/dependencies/managers/IVaultManager";
import { createContext } from "react";

const VaultManagerContext = createContext<IVaultManager | null>(null);
export default VaultManagerContext;
