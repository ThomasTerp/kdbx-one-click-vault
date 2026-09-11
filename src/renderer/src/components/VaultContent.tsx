import { cn } from "@renderer/lib/utils";
import VaultEntryLines from "./VaultEntryLines";

export default function VaultContent({ className, ...props }: React.ComponentProps<"div">) {
	return <VaultEntryLines className={cn("p-3 overflow-auto", className)} {...props} />;
}
