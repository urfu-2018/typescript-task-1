import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class Render {
    public static createView(
        articles: IArticle[],
        measurements: IMeasurement[],
        htmlType: string
    ): string {
        let resultView: string = '';

        articles.forEach(article => {
            resultView += this.renderArticle(article);
        });
        measurements.forEach(measurement => {
            resultView += this.renderMeasurment(measurement);
        });

        return `<div class="${htmlType}">\n${resultView}</div>`;
    }

    private static renderArticle(article: IArticle) {
        const { time, category, title } = article;
        return `[${time}] ${category} - ${title}\n`;
    }

    private static renderMeasurment(measurment: IMeasurement) {
        const { time, temperature, pressure, humidity } = measurment;

        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
    }
}
