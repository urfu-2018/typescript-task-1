import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class View implements IObserver, IView {
    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];
    private readonly lastMeasurementsCount: number;
    private readonly lastArticlesCount: number;
    private readonly name: string;

    public constructor(lastArticlesCount: number, lastMeasurementsCount: number, name: string) {
        this.lastArticlesCount = lastArticlesCount;
        this.lastMeasurementsCount = lastMeasurementsCount;
        this.name = name;
    }

    public render(): void {
        console.log(`<div class="${this.name}">\n${this.getRenderedString()}\n</div>`);
    }

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const isUpdated = this.setLastArticles(observable.getArticles());
            if (isUpdated) {
                this.render();
            }
        }

        if (observable instanceof WeatherState) {
            const isUpdated = this.setLastMeasurements(observable.getMeasurements());
            if (isUpdated) {
                this.render();
            }
        }
    }

    protected getRenderedString() {
        const measurementsString = this.lastMeasurements.map(this.getStringMeasurement).join('\n');
        const articlesString = this.lastArticles.map(this.getStringArticle).join('\n');

        return [articlesString, measurementsString].filter(Boolean).join('\n');
    }

    protected setLastMeasurements(measurements: IMeasurement[]): boolean {
        const startArray = Math.max(measurements.length - this.lastMeasurementsCount, 0);
        const newMeasurements = measurements.slice(startArray, measurements.length);
        if (!this.areArraysEqual(this.lastMeasurements, newMeasurements)) {
            this.lastMeasurements = newMeasurements;
            return true;
        }

        return false;
    }

    protected setLastArticles(articles: IArticle[]): boolean {
        const startArray = Math.max(articles.length - this.lastArticlesCount, 0);
        const newArticles = articles.slice(startArray, articles.length);
        if (!this.areArraysEqual(this.lastArticles, newArticles)) {
            this.lastArticles = newArticles;
            return true;
        }

        return false;
    }

    private areArraysEqual(first: any[], second: any[]): boolean {
        if (first.length !== second.length) {
            return false;
        }

        return first.every((value, index) => value === second[index]);
    }

    private getStringArticle(article: IArticle) {
        const { time, category, title } = article;
        return `[${time}] ${category} - ${title}`;
    }

    private getStringMeasurement(measurement: IMeasurement) {
        const { time, temperature, pressure, humidity } = measurement;
        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
    }
}
