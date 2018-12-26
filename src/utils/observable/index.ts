import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private _observers: Set<IObserver> = new Set<IObserver>();

    public addObserver(observer: IObserver) {
        this._observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        this._observers.delete(observer);
    }

    public notifyObservers() {
        this._observers.forEach(element => {
            element.update(this);
        });
    }
}
