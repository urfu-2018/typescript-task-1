import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export type Formatter<T> = (obj: T) => string;

export function formatMeasurement(measurement: IMeasurement): string {
    const { time, temperature, pressure, humidity } = measurement;
    return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
}

export function formatArticle(article: IArticle): string {
    const { time, category, title } = article;
    return `[${time}] ${category} - ${title}`;
}

export function formatList<T>(list: T[], formatter: Formatter<T>): string {
    return list.map(formatter).join('\n');
}

export function addNewLineIfNotEmpty(str: string): string {
    return str.length > 0 ? `${str}\n` : '';
}
