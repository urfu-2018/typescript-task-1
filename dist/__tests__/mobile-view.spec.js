"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const mocha_1 = require("mocha");
const sinon_1 = tslib_1.__importDefault(require("sinon"));
const news_1 = require("../state/news");
const mobile_1 = require("../views/mobile");
mocha_1.describe('MobileView', () => {
    let consoleSpy = null;
    mocha_1.afterEach(() => {
        if (consoleSpy) {
            consoleSpy.restore();
        }
    });
    mocha_1.it('изменение данных в NewState должно вызывать метод render', () => {
        const newsState = new news_1.NewsState();
        const mobileView = new mobile_1.MobileView();
        const renderSpy = sinon_1.default.spy(mobileView, 'render');
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
        assert_1.default.ok(renderSpy.called, 'метод render() не вызван');
    });
    mocha_1.it('.render должен писать про изменения NewsState в console.log', () => {
        const newsState = new news_1.NewsState();
        const mobileView = new mobile_1.MobileView();
        consoleSpy = sinon_1.default.spy(console, 'log');
        newsState.addObserver(mobileView);
        newsState.setArticles([
            {
                time: '09:00',
                category: 'Алгоритмы',
                title: 'Подборка алгоритмов, которые правят миром'
            }
        ]);
        const markup = '<div class="mobile">\n' +
            '[09:00] Алгоритмы - Подборка алгоритмов, которые правят миром\n' +
            '</div>';
        assert_1.default.ok(consoleSpy.calledOnce, 'render был вызван более 1 раза');
        assert_1.default.ok(consoleSpy.calledWith(markup), 'Выведена некорректная разметка');
    });
});
