import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { ViewType } from './types';

function getPrettyArticle(article: IArticle): string {
    return `[${article.time}] ${article.category} - ${article.title}`;
}

function getPrettyMeasurement(measurement: IMeasurement) {
    const { time, temperature, pressure, humidity } = measurement;
    return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
}

export function renderView(
    type: ViewType,
    articles: IArticle[],
    measurements: IMeasurement[]
): string {
    const result = [];
    const prettyArticles = articles.map(a => getPrettyArticle(a)).join('\n');
    const prettyMeasurements = measurements.map(getPrettyMeasurement).join('\n');

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

export function areArraysEqual<T>(first: T[], second: T[]): boolean {
    if (first.length !== second.length) {
        return false;
    }

    return first.every(element => second.includes(element));
}
