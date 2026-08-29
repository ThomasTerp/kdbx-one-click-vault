import { Observable, Subject } from "rxjs";
import IViewManager from "./IViewManager";

export default class ViewManager implements IViewManager {
	private _change$: Subject<void>;
	private _view: string;

	constructor(defaultView: string) {
		this._view = defaultView;
		this._change$ = new Subject();
	}

	get change$(): Observable<void> {
		return this._change$.asObservable();
	}

	get view(): string {
		return this._view;
	}

	setView(view: string): void {
		this._view = view;
		this._change$.next();
	}
}
