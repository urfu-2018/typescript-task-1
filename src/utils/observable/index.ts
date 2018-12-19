import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    private observers: IObserver[] = [];

    public addObserver(observer: IObserver) {
        this.observers.push(observer);
    }

    public deleteObserver(observer: IObserver) {
        removeElement(this.observers, observer);
    }

    public notifyObservers() {
        for (const observer of this.observers) {
            observer.update(this);
        }
    }
}

function removeElement<T>(array: T[], element: T): void {
    const index = array.indexOf(element);
    if (index > -1) {
        array.splice(index, 1);
    }
}
