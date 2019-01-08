import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private Observers: Set<IObserver>;

    constructor() {
        this.Observers = new Set<IObserver>();
    }

    public addObserver(observer: IObserver) {
        this.Observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.Observers.delete(observer);
    }

    public notifyObservers() {
        this.Observers.forEach(observer => observer.update(this));
    }
}
