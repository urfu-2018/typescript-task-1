import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver>;

    constructor() {
        this.observers = new Set<IObserver>();
    }

    public addObserver(observer: IObserver) {
        this.observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers.delete(observer);
    }

    public notifyObservers() {
        this.observers.forEach(x => x.update(this));
    }
}
