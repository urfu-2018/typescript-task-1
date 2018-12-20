import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private readonly observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        const observerIndex = this.observers.indexOf(observer);
        if (observerIndex < 0) {
            return;
        }
        this.observers.splice(observerIndex, 1);
    }

    public notifyObservers() {
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }
}
