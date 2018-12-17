import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function renderArticle(news: IArticle) {
    const { time, category, title } = news;

    return `[${time}] ${category} - ${title}`;
}

export function renderMeasurement(measurement: IMeasurement) {
    const { time, temperature, pressure, humidity } = measurement;

    return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
}
