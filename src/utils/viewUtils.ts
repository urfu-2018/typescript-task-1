import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { IView } from '../views/types';

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

export abstract class EffectiveLogView implements IView {
    private lastMarkup: string | undefined;

    public effectiveRender(markup: string): void {
        if (!this.lastMarkup || this.lastMarkup !== markup) {
            this.lastMarkup = markup;

            this.render();
        }
    }

    public render(): void {
        console.log(this.lastMarkup);
    }
}
