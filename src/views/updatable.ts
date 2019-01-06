import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IView } from './types';

export default abstract class Updatable implements IView {
    protected lastNews: string[] = [];
    protected lastMeasurments: string[] = [];
    protected abstract view: string;

    public render() {
        console.log(
            // tslint:disable-next-line:prettier
            `<div class="${this.view}">\n${
            this.lastNews
                .concat(this.lastMeasurments)
                // tslint:disable-next-line:prettier
                .join('\n')
            }\n</div>`
        );
    }

    protected updateNews(articles: IArticle[]) {
        const currentNews = articles.map(
            ({ time, category, title }) => `[${time}] ${category} - ${title}`
        );
        if (!currentNews.every(e => this.lastNews.includes(e))) {
            this.lastNews = currentNews;
            this.render();
        }
    }

    protected updateWeather(measurements: IMeasurement[]) {
        const currentMeasurements = measurements.map(
            ({ time, temperature, pressure, humidity }) =>
                `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`
        );
        if (!currentMeasurements.every(e => this.lastMeasurments.includes(e))) {
            this.lastMeasurments = currentMeasurements;
            this.render();
        }
    }
}
