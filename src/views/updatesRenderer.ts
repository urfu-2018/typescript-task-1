import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';

export abstract class UpdatesRenderer implements IObserver, IView {
    protected abstract articlesToRender: number;
    protected abstract measurementToRender: number;
    protected abstract deviceType: string;

    private toRender: string[] = [];
    private prevRender: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.toRender = [
                ...this.toRender,
                ...observable
                    .getArticles()
                    .slice(-this.articlesToRender)
                    .map(this.articleToString)
            ];
        } else if (observable instanceof WeatherState) {
            this.toRender = [
                ...this.toRender,
                ...observable
                    .getMeasurements()
                    .slice(-this.articlesToRender)
                    .map(this.measurementToString)
            ];
        }

        this.render();
    }

    public render() {
        const result = `<div class="${this.deviceType}">\n${this.toRender.join('\n')}\n</div>`;
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
