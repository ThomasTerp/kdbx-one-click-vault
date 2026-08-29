import { useContext } from "react";
import ViewManagerContext from "../contexts/ViewManagerContext";
import IViewManager from "@renderer/dependencies/managers/IViewManager";

export default function useViewManager(): IViewManager {
	const context = useContext(ViewManagerContext);
	if (context == null) {
		throw new Error("View manager provider is missing");
	}
	return context;
}
