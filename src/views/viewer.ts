import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function contentCollection(
    className: string,
    articles: IArticle[],
    measurements: IMeasurement[]
): string {
    let content = `<div class="${className}">\n`;

    for (const article of articles) {
        content += `[${article.time}] ${article.category} - ${article.title}\n`;
    }

    for (const measurement of measurements) {
        content += `[${measurement.time}] ${measurement.temperature} C, ${
            measurement.pressure
        } P, ${measurement.humidity} U\n`;
    }

    content += `</div>`;

    return content;
}
