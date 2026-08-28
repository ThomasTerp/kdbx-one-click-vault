import { useCallback, useState } from "react";

const CONST_SHAKE_CLASS = "animate-shake";

export function useShake(): readonly [() => void, () => void, string | null] {
	const [isShaking, setIsShaking] = useState(false);
	const shake = useCallback((): void => {
		setIsShaking(false);
		requestAnimationFrame(() => setIsShaking(true));
	}, []);
	const stopShaking = useCallback((): void => {
		setIsShaking(false);
	}, []);
	const shakeClassName = isShaking ? CONST_SHAKE_CLASS : null;
	return [shake, stopShaking, shakeClassName] as const;
}
