import { useCallback, useState } from "react";

const CONST_SHAKE_CLASS_NAME = "animate-shake";

export function useShake(): [() => void, () => void, string | null] {
	const [isShaking, setIsShaking] = useState(false);
	const shake = useCallback((): void => {
		setIsShaking(false);
		requestAnimationFrame(() => setIsShaking(true));
	}, []);
	const stopShaking = useCallback((): void => {
		setIsShaking(false);
	}, []);
	const shakeClassName = isShaking ? CONST_SHAKE_CLASS_NAME : null;
	return [shake, stopShaking, shakeClassName];
}
