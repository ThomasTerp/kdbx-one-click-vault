import IUnlockFieldsManager from "@renderer/dependencies/managers/IUnlockFieldsManager";
import { createContext } from "react";

const UnlockFieldsManagerContext = createContext<IUnlockFieldsManager | null>(null);
export default UnlockFieldsManagerContext;
