import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers = this.observers.filter(item => item !== observer);
    }

    public notifyObservers() {
        this.observers.forEach(item => item.update(this));
    }
}
