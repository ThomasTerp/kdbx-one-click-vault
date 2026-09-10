import { VaultData } from "../../../models/VaultData";
import { createContext } from "react";

const VaultDataContext = createContext<VaultData | null>(null);
export default VaultDataContext;
