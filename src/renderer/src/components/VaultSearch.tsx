import * as React from "react";
import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function VaultSearch({ ...props }: React.ComponentProps<"div">) {
	return (
		<InputGroup {...props}>
			<InputGroupInput placeholder="Search…" />
			<InputGroupAddon align="inline-start">
				<Search className="text-muted-foreground" />
			</InputGroupAddon>
		</InputGroup>
	);
}
