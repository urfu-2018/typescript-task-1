import assert from 'assert';

import { afterEach, describe, it } from 'mocha';
import sinon, { SinonSpy } from 'sinon';

import { NewsState } from '../state/news';
import { DesktopView } from '../views/desktop';
import { WeatherState } from '../state/weather';

describe('DesktopView', () => {
    let consoleSpy: SinonSpy | null = null;

    afterEach(() => {
        if (consoleSpy) {
            consoleSpy.restore();
        }
    });

    it('изменение данных в NewState должно вызывать метод render()', () => {
        const newsState = new NewsState();
        const desktopView = new DesktopView();
        const renderSpy = sinon.spy(desktopView, 'render');

        newsState.addObserver(desktopView);
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

    it('.render должен писать про изменения WeatherState в console.log', () => {
        const weatherState = new WeatherState();
        const desktopView = new DesktopView();

        consoleSpy = sinon.spy(console, 'log');

        weatherState.addObserver(desktopView);
        weatherState.setMeasurements([
            {
                time: '08:00',
                temperature: -16.6,
                pressure: 771.3,
                humidity: 79
            }
        ]);

        const markup = '<div class="desktop">\n[08:00] -16.6 C, 771.3 P, 79 U\n</div>';

        assert.ok(consoleSpy.calledOnce, 'render был вызван более 1 раза');
        assert.ok(consoleSpy.calledWith(markup), 'Выведена некорректная разметка');
    });
});
