import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: Set<IObserver> = new Set<IObserver>();

    public addObserver(observer: IObserver): void {
        this.observers.add(observer);
    }

    public deleteObserver(observer: IObserver): void {
        this.observers.delete(observer);
    }

    public notifyObservers(): void {
        this.observers.forEach(observer => observer.update(this));
    }
}
