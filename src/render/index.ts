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
        return `[${article.time}] ${article.category} - ${article.title}\n`;
    }

    private static renderMeasurment(measurment: IMeasurement) {
        return `[${measurment.time}] ${measurment.temperature} C, ${measurment.pressure} P, ${
            measurment.humidity
        } U\n`;
    }
}
