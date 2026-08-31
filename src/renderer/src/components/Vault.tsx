import * as React from "react";
import VaultHeader from "@renderer/components/VaultHeader";
import { cn } from "@/lib/utils";
import VaultContent from "./VaultContent";

export default function Vault({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col", className)} {...props}>
			<VaultHeader />
			<VaultContent className="flex-1" />
		</div>
	);
}
