import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private static articleCount: number = 3;
    private static measurementsCount: number = 2;

    private static prepare(measurements: IMeasurement[], articles: IArticle[]): string {
        let result: string = '';

        result = articles.reduce((value, article) => {
            const { time, category, title } = article;
            return value + `[${time}] ${category} - ${title}\n`;
        }, result);

        result = measurements.reduce((value, measurement) => {
            const { time, pressure, humidity, temperature } = measurement;
            return value + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
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

            this.lastArticles = articles.slice(articles.length - DesktopView.articleCount);
        } else if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();

            this.lastMeasurements = measurements.slice(
                measurements.length - DesktopView.measurementsCount
            );
        } else {
            return;
        }

        this.markup = DesktopView.prepare(this.lastMeasurements, this.lastArticles);

        if (!this.lastMarkup || this.lastMarkup !== this.markup) {
            this.render();
            this.lastMarkup = this.markup;
        }
    }

    public render() {
        console.log(this.markup);
    }
}
