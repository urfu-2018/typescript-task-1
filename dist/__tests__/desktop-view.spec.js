"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const mocha_1 = require("mocha");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const news_1 = require("../state/news");
const desktop_1 = require("../views/desktop");
const weather_1 = require("../state/weather");
mocha_1.describe('DesktopView', () => {
    let consoleSpy = null;
    mocha_1.afterEach(() => {
        if (consoleSpy) {
            consoleSpy.restore();
        }
    });
    mocha_1.it('изменение данных в NewState должно вызывать метод render()', () => {
        const newsState = new news_1.NewsState();
        const desktopView = new desktop_1.DesktopView();
        const renderSpy = sinon_1.default.spy(desktopView, 'render');
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
        assert_1.default.ok(renderSpy.called, 'метод render() не вызван');
    });
    mocha_1.it('.render должен писать про изменения WeatherState в console.log', () => {
        const weatherState = new weather_1.WeatherState();
        const desktopView = new desktop_1.DesktopView();
        consoleSpy = sinon_1.default.spy(console, 'log');
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
        assert_1.default.ok(consoleSpy.calledOnce, 'render был вызван более 1 раза');
        assert_1.default.ok(consoleSpy.calledWith(markup), 'Выведена некорректная разметка');
    });
});
