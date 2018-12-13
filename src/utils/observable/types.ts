export interface IObservable {
    addObserver(observer: IObserver): void;
    deleteObserver(observer: IObserver): void;
    notifyObservers(): void;
}

export interface IObserver {
    update(observable: IObservable): void;
}
