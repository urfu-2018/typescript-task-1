import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { ViewType } from './types';

export abstract class Helpers {
    public static getFormattedArticle(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    public static getFormattedMeasurement(m: IMeasurement) {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`;
    }

    public static getRenderedView(
        viewType: ViewType,
        articles: IArticle[],
        measurements: IMeasurement[]
    ): string {
        const result = [];
        const formattedArticles = articles.map(a => Helpers.getFormattedArticle(a)).join('\n');
        const formattedMeasurements = measurements
            .map(m => Helpers.getFormattedMeasurement(m))
            .join('\n');

        result.push(`<div class="${viewType}">`);
        if (formattedArticles) {
            result.push(formattedArticles);
        }
        if (formattedMeasurements) {
            result.push(formattedMeasurements);
        }
        result.push('</div>');
        return result.join('\n');
    }
}
