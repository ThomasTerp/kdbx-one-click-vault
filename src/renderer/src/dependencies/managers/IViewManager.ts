import { Observable } from "rxjs";

export default interface IViewManager {
	readonly change$: Observable<void>;
	readonly view: string;

	setView(view: string): void;
}
