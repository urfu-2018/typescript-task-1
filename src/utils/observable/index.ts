import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private readonly observers: Set<IObserver> = new Set<IObserver>();

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
