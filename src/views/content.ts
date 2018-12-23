import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class Content {
    public static getNewsContent(news: NewsState, newsCount: number) {
        return news
            .getArticles()
            .slice(-newsCount)
            .map(
                (article: IArticle) => `[${article.time}] ${article.category} - ${article.title}\n`
            )
            .join('');
    }

    public static getWeatherContent(weatherState: WeatherState, weatherCount: number) {
        return weatherState
            .getMeasurements()
            .slice(-weatherCount)
            .map(
                (weather: IMeasurement) =>
                    `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                        weather.humidity
                    } U\n`
            )
            .join('');
    }
}
