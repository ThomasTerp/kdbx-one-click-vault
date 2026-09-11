import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { VaultEntryFieldData } from "../../../models/VaultEntryFieldData";

const PROTECTED_FIELD_CHARACTER_LENGTH = 16;
const COPIED_MESSAGE_DURATION_MS = 1500;

export default function VaultEntryFieldCopyButton({ entryUUID, entryFieldData }: { entryUUID: string; entryFieldData: VaultEntryFieldData }) {
	const { name, field, isProtected } = entryFieldData;
	const [isCopied, setIsCopied] = useState(false);
	const copiedTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

	// #region Events
	const onClick = async (): Promise<void> => {
		const fieldValue = (await window.api.getEntryFieldValue(entryUUID, name)) ?? "";
		await navigator.clipboard.writeText(fieldValue);
		setIsCopied(true);
		if (copiedTimeoutRef.current) {
			clearTimeout(copiedTimeoutRef.current);
		}
		copiedTimeoutRef.current = setTimeout(() => setIsCopied(false), COPIED_MESSAGE_DURATION_MS);
	};
	// #endregion

	// #region Cleanup
	useEffect(() => {
		return () => {
			if (copiedTimeoutRef.current) {
				clearTimeout(copiedTimeoutRef.current);
			}
		};
	}, []);
	// #endregion

	return (
		<div
			className={cn(
				"relative flex flex-col px-2 py-1 text-sm text-card-foreground cursor-pointer rounded-md overflow-hidden text-nowrap hover:bg-accent",
				isCopied && "bg-accent"
			)}
			onClick={() => {
				void onClick();
			}}
		>
			<div className="font-medium text-muted-foreground">{name}</div>
			{isProtected ? (
				// Password input is needed to render `●` properly.
				<input
					className="pointer-events-none field-sizing-content"
					type="password"
					tabIndex={-1}
					value={"●".repeat(PROTECTED_FIELD_CHARACTER_LENGTH)}
					readOnly
				/>
			) : (
				<div className="min-w-16 max-w-64 truncate">{field}</div>
			)}
			{isCopied && (
				<div className="absolute inset-0 flex items-center justify-center pointer-events-none">
					<div className="rounded-md bg-foreground text-background px-2 py-1 ">Copied!</div>
				</div>
			)}
		</div>
	);
}
