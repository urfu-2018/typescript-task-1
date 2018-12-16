import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers.slice(this.observers.indexOf(observer), 1);
    }

    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
