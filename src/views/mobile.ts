import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { formatArticle, formatMeasurement } from './formats';
import { equal } from './utils';

export class MobileView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const oldArticles = this.articles;
            this.articles = observable.getArticles().slice(-1);

            if (!equal(oldArticles, this.articles)) {
                this.render();
            }
        } else if (observable instanceof WeatherState) {
            const oldMeasurements = this.measurements;
            this.measurements = observable.getMeasurements().slice(-1);

            if (!equal(oldMeasurements, this.measurements)) {
                this.render();
            }
        }
    }

    public render() {
        const content = [
            ...this.articles.map(formatArticle),
            ...this.measurements.map(formatMeasurement)
        ];

        console.log(`<div class="mobile">\n${content.join('\n')}\n</div>`);
    }
}
