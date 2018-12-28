import { IView } from './types';
import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export abstract class View implements IView, IObserver {
    public static newsToString(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    public static measurementsToString(measurement: IMeasurement): string {
        const { time, temperature, pressure, humidity }: IMeasurement = measurement;
        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
    }

    private news: string[] = [];
    private measurements: string[] = [];

    private readonly newsLimit: number;
    private readonly measurementsLimit: number;
    private readonly wrapperClassName: string;

    public constructor(newsLimit: number, measurementsLimit: number, wrapperClassName: string) {
        this.newsLimit = newsLimit;
        this.measurementsLimit = measurementsLimit;
        this.wrapperClassName = wrapperClassName;
    }

    public render(): void {
        const lastNews = this.getLastNews();
        const lastMeasurements = this.getLastMeasurements();
        const lines = lastNews.concat(lastMeasurements);
        console.log(`<div class="${this.wrapperClassName}">\n${lines.join('\n')}\n</div>`);
    }

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const prev = this.getLastNews();
            this.updateNews(observable.getArticles());
            const current = this.getLastNews();

            if (isArraysEqual(prev, current)) {
                return;
            }
        } else if (observable instanceof WeatherState) {
            const prev = this.getLastMeasurements();
            this.updateMeasurements(observable.getMeasurements());
            const current = this.getLastMeasurements();

            if (isArraysEqual(prev, current)) {
                return;
            }
        }

        this.render();
    }

    private getLastNews(): string[] {
        return this.news.slice(-this.newsLimit, this.news.length);
    }

    private getLastMeasurements(): string[] {
        return this.measurements.slice(
            this.measurements.length - this.measurementsLimit,
            this.measurements.length
        );
    }

    private updateNews(news: IArticle[]): void {
        this.news = news.slice(0, this.newsLimit).map(View.newsToString);
    }

    private updateMeasurements(measurements: IMeasurement[]): void {
        this.measurements = measurements.map(View.measurementsToString);
    }
}

function isArraysEqual(first: string[], second: string[]): boolean {
    return first.length === second.length && first.every((_item, i) => first[i] === second[i]);
}
