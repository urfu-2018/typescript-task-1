import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public getObservers() {
        return this.observers;
    }

    public addObserver(observer: IObserver) {
        if (!this.observers.includes(observer)) {
            this.observers.push(observer);
        }
    }

    public deleteObserver(observer: IObserver) {
        this.observers = this.observers.filter(o => o !== observer);
    }

    public notifyObservers() {
        this.observers.forEach(observer => {
            observer.update(this);
        });
    }
}
