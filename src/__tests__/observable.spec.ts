import assert from 'assert';

import { describe, it } from 'mocha';
import sinon from 'sinon';

import { IObserver } from '../utils/observable/types';
import { Observable } from '../utils/observable';

class TestObservable extends Observable {}

describe('Observable', () => {
    it('.notifyObservers должен вызывать метод update у наблюдателей', () => {
        const firstObserver: IObserver = {
            update: () => undefined
        };
        const secondObserver: IObserver = {
            update: () => undefined
        };

        const firstSpy = sinon.spy(firstObserver, 'update');
        const secondSpy = sinon.spy(secondObserver, 'update');

        const observable = new TestObservable();

        observable.addObserver(firstObserver);
        observable.addObserver(secondObserver);

        observable.notifyObservers();

        assert.ok(firstSpy.calledOnce, 'метод не был вызван');
        assert.ok(firstSpy.calledWith(observable), 'не был передан observable');

        assert.ok(secondSpy.calledOnce, 'метод не был вызван');
        assert.ok(secondSpy.calledWith(observable), 'не был передан observable');
    });
});
