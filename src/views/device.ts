import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export abstract class DeviceView implements IObserver, IView {
    protected abstract articlesCount: number;
    protected abstract measurementsCount: number;
    protected abstract deviceName: string;

    private previousMarkup: string = '';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.articlesCount);
        } else if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.measurementsCount);
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render() {
        const currentMarkup = this.leadToOutputFormat();
        if (currentMarkup !== this.previousMarkup) {
            this.previousMarkup = currentMarkup;
            console.log(currentMarkup);
        }
    }

    private leadToOutputFormat(): string {
        let result: string = this.articles.reduce(
            (concatValue, article) =>
                concatValue + `[${article.time}] ${article.category} - ${article.title}`,
            ''
        );
        result = this.measurements.reduce(
            (concatValue, measurement) =>
                concatValue +
                `[${measurement.time}] ${measurement.temperature} C,` +
                ` ${measurement.pressure} P, ${measurement.humidity} U`,
            result
        );

        return `<div class="${this.deviceName}">\n${result}\n</div>`;
    }
}
