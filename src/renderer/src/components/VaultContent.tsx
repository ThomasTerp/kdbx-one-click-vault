import { cn } from "@renderer/lib/utils";
import VaultEntryLines from "./VaultEntryLines";

export default function VaultContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("flex flex-col gap-6 p-4", className)} {...props}>
			<VaultEntryLines />
		</div>
	);
}
