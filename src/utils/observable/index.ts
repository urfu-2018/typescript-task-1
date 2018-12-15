import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver> = new Set();

    public addObserver(observer: IObserver): void {
        if (!this.observers.has(observer)) {
            this.observers.add(observer);
        }
    }

    public deleteObserver(observer: IObserver): void {
        if (this.observers.has(observer)) {
            this.observers.delete(observer);
        }
    }

    public notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this));
    }
}
