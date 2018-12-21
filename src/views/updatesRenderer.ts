import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';

export abstract class UpdatesRenderer implements IObserver, IView {
    protected abstract articlesToRender: number;
    protected abstract measurementsToRender: number;
    protected abstract deviceType: string;

    private articles: string[] = [];
    private measurements: string[] = [];
    private prevRender: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable
                .getArticles()
                .slice(-this.articlesToRender)
                .map(this.articleToString);
        } else if (observable instanceof WeatherState) {
            this.measurements = observable
                .getMeasurements()
                .slice(-this.measurementsToRender)
                .map(this.measurementToString);
        }

        this.render();
    }

    public render() {
        const result = `<div class="${this.deviceType}">\n${this.articles
            .concat(this.measurements)
            .join('\n')}\n</div>`;
        if (result !== this.prevRender) {
            console.log(result);
            this.prevRender = result;
        }
    }

    private articleToString = (article: IArticle) =>
        `[${article.time}] ${article.category} - ${article.title}`;

    private measurementToString = (measurement: IMeasurement) =>
        `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
            measurement.humidity
        } U`;
}
