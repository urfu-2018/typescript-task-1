"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Observable {
    constructor() {
        this.observers = [];
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    deleteObserver(observer) {
        this.observers.slice(this.observers.indexOf(observer), 1);
    }
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
exports.Observable = Observable;
