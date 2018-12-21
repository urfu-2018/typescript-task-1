import { IObservable } from '../utils/observable/types';
import { IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export abstract class New implements IObserver, IView {
    protected abstract renderArticles: number;
    protected abstract renderMeasurements: number;
    protected abstract type: string;

    private newArticles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private newRender: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.newArticles = observable.getArticles().slice(-this.renderArticles);
        } else if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.renderMeasurements);
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render(): void {
        const news = this.newArticles.map(n => `[${n.time}] ${n.category} - ${n.title}\n`).join('');
        const weather = this.measurements
            .map(w => `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
            .join('');

        const result = `<div class="${this.type}">\n${news + weather}</div>`;

        if (result !== this.newRender) {
            this.newRender = result;
            console.log(this.newRender);
        }
    }
}
