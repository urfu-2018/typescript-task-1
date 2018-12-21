import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class Content {
    private facts: Set<IObservable>;
    private weatherCount: number = 0;
    private newsCount: number = 0;
    private news: string = '';
    private weatherMeasurements: string = '';
    private view: string = '';

    constructor(facts: Set<IObservable>, view: string) {
        this.facts = facts;
        if (view === 'desktop') {
            this.weatherCount = 2;
            this.newsCount = 3;
        } else if (view === 'mobile') {
            this.weatherCount = 1;
            this.newsCount = 1;
        }
        this.view = view;
    }

    public getString() {
        this.facts.forEach(fact => {
            if (fact instanceof NewsState) {
                this.news = this.getNewsContent(fact);
            }
            if (fact instanceof WeatherState) {
                this.weatherMeasurements = this.getWeatherContent(fact);
            }
        });
        return `<div class="${this.view}">\n${this.news}${this.weatherMeasurements}</div>`;
    }

    private getNewsContent(news: NewsState) {
        return news
            .getArticles()
            .slice(-this.newsCount)
            .map(
                (article: IArticle) => `[${article.time}] ${article.category} - ${article.title}\n`
            )
            .join('');
}

    private getWeatherContent(weatherState: WeatherState) {
        return weatherState
            .getMeasurements()
            .slice(-this.weatherCount)
            .map(
                (weather: IMeasurement) =>
                    `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                        weather.humidity
                    } U\n`
            )
            .join('');
    }
}
