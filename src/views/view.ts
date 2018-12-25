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
        measurements.forEach(measurement => {
            this.lastMeasurements.push(measurement);
            if (measurements.length > lastMeasurementsCount) {
                this.lastMeasurements.shift();
            }
        });
    }

    protected setLastArticles(articles: IArticle[], lastArticlesCount: number) {
        articles.forEach(article => {
            this.lastArticles.push(article);
            if (this.lastArticles.length > lastArticlesCount) {
                this.lastArticles.shift();
            }
        });
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
