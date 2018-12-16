"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const mocha_1 = require("mocha");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const observable_1 = require("../utils/observable");
class TestObservable extends observable_1.Observable {
}
mocha_1.describe('Observable', () => {
    mocha_1.it('.notifyObservers должен вызывать метод update у наблюдателей', () => {
        const firstObserver = {
            update: () => undefined
        };
        const secondObserver = {
            update: () => undefined
        };
        const firstSpy = sinon_1.default.spy(firstObserver, 'update');
        const secondSpy = sinon_1.default.spy(secondObserver, 'update');
        const observable = new TestObservable();
        observable.addObserver(firstObserver);
        observable.addObserver(secondObserver);
        observable.notifyObservers();
        assert_1.default.ok(firstSpy.calledOnce, 'метод не был вызван');
        assert_1.default.ok(firstSpy.calledWith(observable), 'не был передан observable');
        assert_1.default.ok(secondSpy.calledOnce, 'метод не был вызван');
        assert_1.default.ok(secondSpy.calledWith(observable), 'не был передан observable');
    });
});
