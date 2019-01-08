import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];
    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        this.observers = this.observers.filter(element => element !== observer);
    }

    public notifyObservers() {
        this.observers.forEach(element => {
            element.update(this);
        });
    }
}
