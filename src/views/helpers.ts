import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { ViewType } from './types';

export abstract class Helpers {
    public static getPrettyArticle(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    public static getPrettyMeasurement(m: IMeasurement) {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`;
    }

    public static renderView(
        type: ViewType,
        articles: IArticle[],
        measurements: IMeasurement[]
    ): string {
        const result = [];
        const prettyArticles = articles.map(a => Helpers.getPrettyArticle(a)).join('\n');
        const prettyMeasurements = measurements.map(Helpers.getPrettyMeasurement).join('\n');

        result.push(`<div class="${type}">`);
        if (prettyArticles) {
            result.push(prettyArticles);
        }
        if (prettyMeasurements) {
            result.push(prettyMeasurements);
        }
        result.push('</div>');
        return result.join('\n');
    }
}
