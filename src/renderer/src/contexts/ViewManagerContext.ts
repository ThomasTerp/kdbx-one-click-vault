import IViewManager from "@renderer/dependencies/managers/IViewManager";
import { createContext } from "react";

const ViewManagerContext = createContext<IViewManager | null>(null);
export default ViewManagerContext;
