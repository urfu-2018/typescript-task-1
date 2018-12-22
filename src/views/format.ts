import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function formatMeasurement(measurement: IMeasurement) {
    return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
        measurement.humidity
    } U`;
}

export function formatArticle(article: IArticle) {
    return `[${article.time}] ${article.category} - ${article.title}`;
}
