"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const assert_1 = tslib_1.__importDefault(require("assert"));
const mocha_1 = require("mocha");
const news_1 = require("../state/news");
const weather_1 = require("../state/weather");
mocha_1.describe('NewsState', () => {
    mocha_1.it('должен сохранять статьи', () => {
        const articles = [
            {
                time: '23:00',
                category: 'Веб-разработка',
                title: 'Краткое руководство по Redux для начинающих'
            }
        ];
        const newsState = new news_1.NewsState();
        newsState.setArticles(articles);
        assert_1.default.deepStrictEqual(newsState.getArticles(), articles);
    });
});
mocha_1.describe('WeatherState', () => {
    mocha_1.it('должен сохранять измерения', () => {
        const measurements = [
            {
                time: '12:00',
                pressure: 767.2,
                humidity: 44,
                temperature: -14.9
            }
        ];
        const weatherState = new weather_1.WeatherState();
        weatherState.setMeasurements(measurements);
        assert_1.default.deepStrictEqual(weatherState.getMeasurements(), measurements);
    });
});
