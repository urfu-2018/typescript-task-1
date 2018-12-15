import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export function prepareView(
    htmlClass: string,
    measurements: IMeasurement[],
    articles: IArticle[]
): string {
    let result = '';

    result = articles.reduce((prevValue, article) => {
        const { time, category, title } = article;
        return prevValue + `[${time}] ${category} - ${title}\n`;
    }, result);

    result = measurements.reduce((prevValue, measurement) => {
        const { time, pressure, humidity, temperature } = measurement;
        return prevValue + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
    }, result);

    return `<div class="${htmlClass}">\n${result}</div>`;
}
