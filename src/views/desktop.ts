import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { formatArticle, formatMeasurement } from './formats';
import { equal } from './utils';

export class DesktopView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const oldArticles = this.articles;
            this.articles = observable.getArticles().slice(-3);

            if (!equal(oldArticles, this.articles)) {
                this.render();
            }
        } else if (observable instanceof WeatherState) {
            const oldMeasurements = this.measurements;
            this.measurements = observable.getMeasurements().slice(-2);

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

        console.log(`<div class="desktop">\n${content.join('\n')}\n</div>`);
    }
}
