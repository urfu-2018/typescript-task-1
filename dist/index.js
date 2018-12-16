"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobile_1 = require("./views/mobile");
const desktop_1 = require("./views/desktop");
const news_1 = require("./state/news");
const weather_1 = require("./state/weather");
exports.newsState = new news_1.NewsState();
exports.weatherState = new weather_1.WeatherState();
exports.mobileView = new mobile_1.MobileView();
exports.desktopView = new desktop_1.DesktopView();
exports.newsState.addObserver(exports.mobileView);
exports.newsState.addObserver(exports.desktopView);
exports.weatherState.addObserver(exports.mobileView);
exports.weatherState.addObserver(exports.desktopView);
exports.newsState.setArticles([
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
exports.weatherState.setMeasurements([
    {
        time: '08:00',
        temperature: -16.6,
        pressure: 771.3,
        humidity: 79
    },
    {
        time: '14:00',
        temperature: -7.2,
        pressure: 756.4,
        humidity: 76
    }
]);
