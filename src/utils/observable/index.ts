import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[];

    constructor() {
        this.observers = [];
    }

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers = this.observers.filter(x => x !== observer);
    }

    public notifyObservers() {
        this.observers.forEach(x => x.update(this));
    }
}
