export default function getFileNameFromPath(path: string | null | undefined): string | undefined {
	return path?.split(/[\\/]/).pop()?.replace(/\.[^./\\]+$/, "");
}
