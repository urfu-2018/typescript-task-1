import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DataViewer {
    protected content = '';
    protected flag = true;
    private previousContent = '';

    public printContent(
        observable: IObservable,
        countOfArticles: number,
        countOfMeasurements: number
    ): string {
        let content = '';

        if (observable instanceof NewsState) {
            const articles = observable.getArticles().slice(-countOfArticles);

            for (const article of articles) {
                content += `[${article.time}] ${article.category} - ${article.title}\n`;
            }
        }

        if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements().slice(-countOfMeasurements);

            for (const measurement of measurements) {
                content += `[${measurement.time}] ${measurement.temperature} C, ${
                    measurement.pressure
                } P, ${measurement.humidity} U\n`;
            }
        }

        if (this.previousContent === content) {
            this.flag = false;
        }

        this.previousContent = content;

        return content;
    }
}
