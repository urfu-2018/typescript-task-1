import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export class View {
    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    protected getRenderedString() {
        const measurementsString = this.lastMeasurements
            .map(measurement => this.getStringMeasurement(measurement))
            .join('\n');
        const articlesString = this.lastArticles
            .map(article => this.getStringArticle(article))
            .join('\n');

        return [articlesString, measurementsString].filter(str => str.length > 0).join('\n');
    }

    protected setLastMeasurements(
        measurements: IMeasurement[],
        lastMeasurementsCount: number
    ): boolean {
        const newMeasurements = measurements.slice(
            Math.max(measurements.length - lastMeasurementsCount, 0),
            measurements.length
        );
        if (!this.areArraysEqual(this.lastMeasurements, newMeasurements)) {
            this.lastMeasurements = newMeasurements;
            return true;
        }

        return false;
    }

    protected setLastArticles(articles: IArticle[], lastArticlesCount: number): boolean {
        const newArticles = articles.slice(
            Math.max(articles.length - lastArticlesCount, 0),
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
