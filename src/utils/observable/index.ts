import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    public deleteObserver(observer: IObserver) {
        const observerIndex = this.observers.indexOf(observer);

        if (observerIndex !== -1) {
            this.observers.slice(observerIndex, 1);
        }
    }

    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
