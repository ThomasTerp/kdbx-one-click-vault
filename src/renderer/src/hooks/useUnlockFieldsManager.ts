import { useContext } from "react";
import UnlockFieldsManagerContext from "../contexts/UnlockFieldsManagerContext";
import IUnlockFieldsManager from "@renderer/dependencies/managers/IUnlockFieldsManager";

export default function useUnlockFieldsManager(): IUnlockFieldsManager {
	const context = useContext(UnlockFieldsManagerContext);
	if (context == null) {
		throw new Error("Unlock fields manager provider is missing");
	}
	return context;
}
