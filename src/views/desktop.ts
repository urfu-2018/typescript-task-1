import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export class DesktopView implements IObserver, IView {
    private static articlesSize: number = 3;
    private static measurementsSize: number = 2;

    private static prepareData(measurements: IMeasurement[], articles: IArticle[]): string {
        let result = '';

        result = articles.reduce((prevValue, article) => {
            const { time, category, title } = article;
            return prevValue + `[${time}] ${category} - ${title}\n`;
        }, result);

        result = measurements.reduce((prevValue, measurement) => {
            const { time, pressure, humidity, temperature } = measurement;
            return prevValue + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
        }, result);

        return `<div class="desktop">\n${result}</div>`;
    }

    private markup: string = '';
    private lastMarkup: string | undefined;
    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();

            this.lastArticles = articles.slice(articles.length - DesktopView.articlesSize);
        } else if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();

            this.lastMeasurements = measurements.slice(
                measurements.length - DesktopView.measurementsSize
            );
        } else {
            return;
        }
        this.markup = DesktopView.prepareData(this.lastMeasurements, this.lastArticles);

        if (!this.lastMarkup || this.lastMarkup !== this.markup) {
            this.render();

            this.lastMarkup = this.markup;
        }
    }

    public render() {
        console.log(this.markup);
    }
}
