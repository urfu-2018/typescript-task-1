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

        const formattedNews = newsToShow.map(this.articleToString);
        const formattedWeather = measurementsToShow.map(this.measurementToString);

        return formattedNews.concat(formattedWeather).join('\n');
    }

    private articleToString({ time, category, title }: IArticle): string {
        return `[${time}] ${category} - ${title}`;
    }

    private measurementToString({ time, temperature, pressure, humidity }: IMeasurement): string {
        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
    }
}
