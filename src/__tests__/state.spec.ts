import assert from 'assert';

import { describe, it } from 'mocha';

import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';

describe('NewsState', () => {
    it('должен сохранять статьи', () => {
        const articles: IArticle[] = [
            {
                time: '23:00',
                category: 'Веб-разработка',
                title: 'Краткое руководство по Redux для начинающих'
            }
        ];

        const newsState = new NewsState();

        newsState.setArticles(articles);

        assert.deepStrictEqual(newsState.getArticles(), articles);
    });
});

describe('WeatherState', () => {
    it('должен сохранять измерения', () => {
        const measurements: IMeasurement[] = [
            {
                time: '12:00',
                pressure: 767.2,
                humidity: 44,
                temperature: -14.9
            }
        ];

        const weatherState = new WeatherState();

        weatherState.setMeasurements(measurements);

        assert.deepStrictEqual(weatherState.getMeasurements(), measurements);
    });
});
