import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IView } from './types';

export abstract class Updatable implements IView {
    protected lastNews: string[] = [];
    protected lastMeasurments: string[] = [];
    protected abstract view: string;

    public render() {
        console.log(
            `<div class="${this.view}">\n${this.lastNews
                .concat(this.lastMeasurments)
                .join('\n')}\n</div>`
        );
    }

    protected updateNews(articles: IArticle[]) {
        const currentNews = articles.map(
            article => `[${article.time}] ${article.category} - ${article.title}`
        );
        if (!currentNews.every(e => this.lastNews.includes(e))) {
            this.lastNews = currentNews;
            this.render();
        }
    }

    protected updateWeather(measurements: IMeasurement[]) {
        const currentMeasurements = measurements.map(
            measurement =>
                `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
                    measurement.humidity
                } U`
        );
        if (!currentMeasurements.every(e => this.lastMeasurments.includes(e))) {
            this.lastMeasurments = currentMeasurements;
            this.render();
        }
    }
}
