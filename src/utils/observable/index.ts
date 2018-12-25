import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver> = new Set<IObserver>();

    public addObserver(observer: IObserver) {
        this.observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers.delete(observer);
    }

    public notifyObservers() {
        Array.from(this.observers.entries()).forEach(([observer, _]) => observer.update(this));
    }
}
