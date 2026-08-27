interface UnlockVaultViewProps {
	lockVault: () => void;
}

export default function VaultView({ lockVault }: UnlockVaultViewProps) {
	return (
		<div className="flex min-h-screen items-center justify-center" onClick={() => lockVault()}>
			Vault View
		</div>
	);
}
