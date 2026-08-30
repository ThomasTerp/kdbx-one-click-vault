import { useContext } from "react";
import ThemeManagerContext from "../contexts/ThemeManagerContext";
import IThemeManager from "@renderer/dependencies/managers/IThemeManager";

export default function useThemeManager(): IThemeManager {
	const context = useContext(ThemeManagerContext);
	if (context == null) {
		throw new Error("Theme manager provider is missing");
	}
	return context;
}
