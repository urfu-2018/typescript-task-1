import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private readonly observers: IObserver[] = new Array();

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        const i = this.observers.indexOf(observer);
        if (i !== -1) {
            this.observers.splice(i, 1);
        }
    }

    public notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
