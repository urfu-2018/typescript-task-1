import { MobileView } from './views/mobile';
import { DesktopView } from './views/desktop';
import { NewsState } from './state/news';
import { WeatherState } from './state/weather';

export const newsState = new NewsState();
export const weatherState = new WeatherState();

export const mobileView = new MobileView();
export const desktopView = new DesktopView();

newsState.addObserver(mobileView);
newsState.addObserver(desktopView);
weatherState.addObserver(mobileView);
weatherState.addObserver(desktopView);

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

weatherState.setMeasurements([
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
