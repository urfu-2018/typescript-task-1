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

    protected setLastMeasurements(measurements: IMeasurement[], lastMeasurementsCount: number) {
        this.lastMeasurements = measurements.slice(
            Math.max(measurements.length - lastMeasurementsCount, 0),
            measurements.length
        );
    }

    protected setLastArticles(articles: IArticle[], lastArticlesCount: number) {
        this.lastArticles = articles.slice(
            Math.max(articles.length - lastArticlesCount, 0),
            articles.length
        );
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
