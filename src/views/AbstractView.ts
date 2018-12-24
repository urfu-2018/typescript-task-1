import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';

export abstract class AbstractView implements IView, IObserver {
    private markup: string = '';
    private lastMarkup?: string;
    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    constructor(
        private deviceName: string,
        private articleCount: number,
        private measurementsCount: number
    ) {}

    public prepare(measurements: IMeasurement[], articles: IArticle[]): string {
        let result: string = '';

        result = articles.reduce((value, article) => {
            const { time, category, title } = article;
            return value + `[${time}] ${category} - ${title}\n`;
        }, result);

        result = measurements.reduce((value, measurement) => {
            const { time, pressure, humidity, temperature } = measurement;
            return value + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
        }, result);

        return `<div class="${this.deviceName}">\n${result}</div>`;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();

            this.lastArticles = articles.slice(-this.articleCount);
        }

        if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();

            this.lastMeasurements = measurements.slice(-this.measurementsCount);
        }

        this.markup = this.prepare(this.lastMeasurements, this.lastArticles);

        if (!this.lastMarkup || this.lastMarkup !== this.markup) {
            this.render();
            this.lastMarkup = this.markup;
        }
    }

    public render() {
        console.log(this.markup);
    }
}
