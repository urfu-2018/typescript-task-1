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
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
    notifyObservers() {
        this.observers.forEach(observer => observer.update(this));
    }
}
exports.Observable = Observable;
