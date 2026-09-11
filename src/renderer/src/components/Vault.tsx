import * as React from "react";
import VaultHeader from "@renderer/components/VaultHeader";
import { cn } from "@/lib/utils";
import VaultContent from "./VaultContent";

export default function Vault({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("grid grid-rows-[auto_1fr] overflow-y-hidden", className)} {...props}>
			<VaultHeader />
			<VaultContent />
		</div>
	);
}
