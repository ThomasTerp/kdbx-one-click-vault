import * as React from "react";

import { cn } from "@/lib/utils";

export default function VaultContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex items-center justify-center", className)} {...props}>
			Vault content
		</div>
	);
}
