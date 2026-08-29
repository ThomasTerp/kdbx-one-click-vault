import { useSyncExternalStore } from "react";
import { Observable } from "rxjs";

export default function useObservableState<T>(observable: Observable<unknown>, getValue: () => T): T {
	const value = useSyncExternalStore((callback) => {
		const subscription = observable.subscribe(callback);
		return () => subscription.unsubscribe();
	}, getValue);
	return value;
}
