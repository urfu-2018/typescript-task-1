import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { articleToString, measurementToString } from '../utils/formatters';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { articlesChanged, measurementsChanged } from './comparer';

export class MobileView implements IObserver, IView {
    private static readonly NewsAmount = 1;
    private static readonly MeasurementsAmount = 1;
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const incomingArticles = observable.getArticles();
            const relevantArticles = incomingArticles.slice(
                Math.max(incomingArticles.length - MobileView.NewsAmount, 0)
            );
            if (!articlesChanged(this.articles, relevantArticles)) {
                return;
            }
            this.articles = relevantArticles;
        } else if (observable instanceof WeatherState) {
            const incomingMeasurements = observable.getMeasurements();
            const relevantMeasurements = incomingMeasurements.slice(
                Math.max(incomingMeasurements.length - MobileView.MeasurementsAmount, 0)
            );
            if (!measurementsChanged(this.measurements, relevantMeasurements)) {
                return;
            }
            this.measurements = relevantMeasurements;
        } else {
            throw new TypeError('Unsupported event type');
        }

        this.render();
    }

    public render() {
        const articles = this.articles.map(article => articleToString(article));
        const reports = this.measurements.map(report => measurementToString(report));
        console.log(`<div class="mobile">\n${articles.concat(reports).join('\n')}\n</div>`);
    }
}
