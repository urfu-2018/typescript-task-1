import { IObservable, IObserver } from './types';

export class Observable implements IObservable {
    public addObserver(observer: IObserver) {
        throw new Error('Not implemented');
    }

    public deleteObserver(observer: IObserver) {
        throw new Error('Not implemented');
    }

    public notifyObservers() {
        throw new Error('Not implemented');
    }
}
