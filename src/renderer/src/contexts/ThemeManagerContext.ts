import IThemeManager from "@renderer/dependencies/managers/IThemeManager";
import { createContext } from "react";

const ThemeManagerContext = createContext<IThemeManager | null>(null);
export default ThemeManagerContext;
