import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers = new Set();

    public addObserver(observer: IObserver) {
        this.observers.add(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers.delete(observer);
    }

    public notifyObservers() {
        this.observers.forEach(obs => obs.update(this));
    }
}
