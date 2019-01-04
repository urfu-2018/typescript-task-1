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

    private news: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    private readonly newsLimit: number;
    private readonly measurementsLimit: number;
    private readonly wrapperClassName: string;

    public constructor(newsLimit: number, measurementsLimit: number, wrapperClassName: string) {
        this.newsLimit = newsLimit;
        this.measurementsLimit = measurementsLimit;
        this.wrapperClassName = wrapperClassName;
    }

    public render(): void {
        const lastNews = this.news.map(View.newsToString);
        const lastMeasurements = this.measurements.map(View.measurementsToString);
        const lines = lastNews.concat(lastMeasurements);
        console.log(`<div class="${this.wrapperClassName}">\n${lines.join('\n')}\n</div>`);
    }

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const prev = this.news;
            this.updateNews(observable.getArticles());

            if (isArraysEqual(prev, this.news)) {
                return;
            }
        } else if (observable instanceof WeatherState) {
            const prev = this.measurements;
            this.updateMeasurements(observable.getMeasurements());

            if (isArraysEqual(prev, this.measurements)) {
                return;
            }
        }

        this.render();
    }

    private updateNews(news: IArticle[]): void {
        this.news = news.slice(-this.newsLimit);
    }

    private updateMeasurements(measurements: IMeasurement[]): void {
        this.measurements = measurements.slice(-this.measurementsLimit);
    }
}

function isArraysEqual<T extends IMeasurement | IArticle>(first: T[], second: T[]): boolean {
    return (
        first.length === second.length && first.every((_item, i) => isEqual(first[i], second[i]))
    );
}

function isEqual<T extends IMeasurement | IArticle>(first: T, second: T) {
    const firstArticle = first as IArticle;
    const secondArticle = second as IArticle;
    if (firstArticle !== undefined && secondArticle !== undefined) {
        return (
            firstArticle.title === secondArticle.title &&
            firstArticle.time === secondArticle.time &&
            firstArticle.category === secondArticle.category
        );
    }

    const firstMeasurement = first as IMeasurement;
    const secondMeasurement = second as IMeasurement;
    return (
        firstMeasurement.time === secondMeasurement.time &&
        firstMeasurement.humidity === secondMeasurement.humidity &&
        firstMeasurement.pressure === secondMeasurement.pressure &&
        firstMeasurement.temperature === secondMeasurement.temperature
    );
}
