import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { formatArticle, formatMeasurement } from './format';
import { equal } from './utility';

export class DesktopView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const pastArticles = this.articles;
            this.articles = observable.getArticles().slice(-3);

            if (!equal(pastArticles, this.articles)) {
                this.render();
            }
        }
        if (observable instanceof WeatherState) {
            const pastMeasurments = this.measurements;
            this.measurements = observable.getMeasurements().slice(-2);

            if (!equal(this.measurements, pastMeasurments)) {
                this.render();
            }
        }
    }

    public render() {
        const newContent = [
            ...this.articles.map(formatArticle),
            ...this.measurements.map(formatMeasurement)
        ];

        console.log(`<div class="desktop">\n${newContent.join('\n')}\n</div>`);
    }
}
