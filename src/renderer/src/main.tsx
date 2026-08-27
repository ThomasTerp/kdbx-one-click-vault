import React from "react";
import ReactDOM from "react-dom/client";
import OneClickVault from "./components/OneClickVault";
import "./assets/main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<OneClickVault />
	</React.StrictMode>
);
