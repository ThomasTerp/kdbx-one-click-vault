import { Search } from "lucide-react";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";

export default function VaultSearch() {
	return (
		<InputGroup className="max-w-xl mx-auto">
			<InputGroupInput placeholder="Search…" />
			<InputGroupAddon align="inline-start">
				<Search className="text-muted-foreground" />
			</InputGroupAddon>
		</InputGroup>
	);
}
