import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver> = new Set<IObserver>();

    public addObserver(observer: IObserver) {
        if (this.observers.has(observer)) {
            return;
        }
        this.observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        if (!this.observers.has(observer)) {
            return;
        }
        this.observers.delete(observer);
    }

    public notifyObservers() {
        this.observers.forEach((observer: IObserver) => observer.update(this));
    }
}
