import { IObservable, IObserver } from '../utils/observable/types';
import { WeatherState } from '../state/weather/index';
import { NewsState } from '../state/news/index';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class View implements IView, IObserver {
    private articlesCount: number;
    private measurementsCount: number;

    private divClassName: string;

    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    constructor(articleCount: number, measurementsCount: number, divClassName: string) {
        this.articlesCount = articleCount;
        this.measurementsCount = measurementsCount;
        this.divClassName = divClassName;
    }

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            const weather = observable as WeatherState;

            const newArticles = weather.getMeasurements();
            if (this.measurements === newArticles) {
                return;
            }
            this.measurements = newArticles;
        }
        if (observable instanceof NewsState) {
            const news = observable as NewsState;

            const newArticles = news.getArticles();
            if (this.articles === newArticles) {
                return;
            }
            this.articles = newArticles;
        }

        this.render();
    }

    public render(): void {
        console.log(`<div class="${this.divClassName}">\n${this.getFormattedEntries()}\n</div>`);
    }

    private getFormattedEntries(): string {
        const newsToShow: IArticle[] = this.articles.slice(
            Math.max(this.articles.length - this.articlesCount, 0)
        );
        const measurementsToShow: IMeasurement[] = this.measurements.slice(
            Math.max(this.measurements.length - this.measurementsCount, 0)
        );

        const formattedNews = newsToShow.map(article => this.articleToString(article)).join('\n');
        const formattedWeather = measurementsToShow
            .map(measurement => this.measurementToString(measurement))
            .join('\n');

        return formattedNews + formattedWeather;
    }

    private articleToString(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private measurementToString(measurement: IMeasurement): string {
        return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
            measurement.humidity
        } U`;
    }
}
