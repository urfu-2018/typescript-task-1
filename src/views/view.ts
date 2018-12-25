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
        const measurementsString = this.lastMeasurements
            .map(measurement => this.getStringMeasurement(measurement))
            .join('\n');
        const articlesString = this.lastArticles
            .map(article => this.getStringArticle(article))
            .join('\n');

        return [articlesString, measurementsString].filter(str => str.length > 0).join('\n');
    }

    protected setLastMeasurements(measurements: IMeasurement[]): boolean {
        const newMeasurements = measurements.slice(
            Math.max(measurements.length - this.lastMeasurementsCount, 0),
            measurements.length
        );
        if (!this.areArraysEqual(this.lastMeasurements, newMeasurements)) {
            this.lastMeasurements = newMeasurements;
            return true;
        }

        return false;
    }

    protected setLastArticles(articles: IArticle[]): boolean {
        const newArticles = articles.slice(
            Math.max(articles.length - this.lastArticlesCount, 0),
            articles.length
        );
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
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private getStringMeasurement(measurement: IMeasurement) {
        return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
            measurement.humidity
        } U`;
    }
}
