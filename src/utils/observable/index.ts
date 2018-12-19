import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers.unshift(observer);
    }

    public notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}
