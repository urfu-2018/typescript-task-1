import assert from 'assert';

import { afterEach, describe, it } from 'mocha';
import sinon, { SinonSpy } from 'sinon';

import { NewsState } from '../state/news';
import { MobileView } from '../views/mobile';

describe('MobileView', () => {
    let consoleSpy: SinonSpy | null = null;

    afterEach(() => {
        if (consoleSpy) {
            consoleSpy.restore();
        }
    });

    it('изменение данных в NewState должно вызывать метод render', () => {
        const newsState = new NewsState();
        const mobileView = new MobileView();
        const renderSpy = sinon.spy(mobileView, 'render');

        newsState.addObserver(mobileView);
        newsState.setArticles([
            {
                time: '09:00',
                category: 'Алгоритмы',
                title: 'Подборка алгоритмов, которые правят миром'
            },
            {
                time: '10:00',
                category: 'Python',
                title: 'Рефакторим код на Python с помощью тестов'
            },
            {
                time: '12:00',
                category: 'JavaScript',
                title: 'Как использовать декораторы с фабричными функциями в JavaScript'
            }
        ]);
        assert.ok(renderSpy.called, 'метод render() не вызван');
    });

    it('.render должен писать про изменения NewsState в console.log', () => {
        const newsState = new NewsState();
        const mobileView = new MobileView();

        consoleSpy = sinon.spy(console, 'log');

        newsState.addObserver(mobileView);
        newsState.setArticles([
            {
                time: '09:00',
                category: 'Алгоритмы',
                title: 'Подборка алгоритмов, которые правят миром'
            }
        ]);

        const markup =
            '<div class="mobile">\n' +
            '[09:00] Алгоритмы - Подборка алгоритмов, которые правят миром\n' +
            '</div>';

        assert.ok(consoleSpy.calledOnce, 'render был вызван более 1 раза');
        assert.ok(consoleSpy.calledWith(markup), 'Выведена некорректная разметка');
    });
});
