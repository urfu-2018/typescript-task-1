import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver> = new Set();

    public addObserver(observer: IObserver) {
        if (!this.observers.has(observer)) {
            this.observers.add(observer);
        }
    }

    public deleteObserver(observer: IObserver) {
        if (this.observers.has(observer)) {
            this.observers.delete(observer);
        }
    }

    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
