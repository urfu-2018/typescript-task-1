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

    public static measurementsToString(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`;
    }

    private news: string[];
    private measurements: string[];

    private readonly newsCount: number;
    private readonly measurementsCount: number;
    private readonly divClassName: string;

    public constructor(newsCount: number, measurementsCount: number, divClassName: string) {
        this.newsCount = newsCount;
        this.measurementsCount = measurementsCount;
        this.divClassName = divClassName;
        this.news = [];
        this.measurements = [];
    }

    public render(): void {
        const lines = this.getLastNews().concat(this.getLastMeasurements());
        console.log(`<div class="${this.divClassName}">\n${lines.join('\n')}\n</div>`);
    }

    public update(observable: IObservable): void {
        let isNeedToRender = false;

        if (observable instanceof NewsState) {
            const prev = this.getLastNews();
            this.updateNews(observable.getArticles());
            const current = this.getLastNews();
            isNeedToRender = !isArraysEqual(prev, current);
        } else if (observable instanceof WeatherState) {
            const prev = this.getLastMeasurements();
            this.updateMeasurements(observable.getMeasurements());
            const current = this.getLastMeasurements();
            isNeedToRender = !isArraysEqual(prev, current);
        }

        if (isNeedToRender) {
            this.render();
        }
    }

    private getLastNews(): string[] {
        return this.news.slice(this.news.length - this.newsCount, this.news.length);
    }

    private getLastMeasurements(): string[] {
        return this.measurements.slice(
            this.measurements.length - this.measurementsCount,
            this.measurements.length
        );
    }

    private updateNews(news: IArticle[]): void {
        this.news = news.map(View.newsToString);
    }

    private updateMeasurements(measurements: IMeasurement[]): void {
        this.measurements = measurements.map(View.measurementsToString);
    }
}

function isArraysEqual(first: string[], second: string[]): boolean {
    return first.length === second.length && first.every((_item, i) => first[i] === second[i]);
}
