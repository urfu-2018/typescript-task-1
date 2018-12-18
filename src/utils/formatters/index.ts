import { IArticle } from '../../state/news/types';
import { IMeasurement } from '../../state/weather/types';

export function articleToString(article: IArticle): string {
    return `[${article.time}] ${article.category} - ${article.title}`;
}

export function measurementToString(measurement: IMeasurement) {
    return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
        measurement.humidity
    } U`;
}
