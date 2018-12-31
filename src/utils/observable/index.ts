import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];
    public addObserver(observer: IObserver) {
        this.observers.push(observer);
        console.info(this.observers);
    }

    public deleteObserver(observer: IObserver) {
        const index = this.observers.indexOf(observer, 0);
        if (index > -1) {
            this.observers.splice(index, 1);
        }
    }

    public notifyObservers() {
        this.observers.forEach(x => x.update(this));
    }
}
