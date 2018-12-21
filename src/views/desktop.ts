import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { articleToString, measurementToString } from '../utils/formatters';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { changed } from './comparer';

export class DesktopView implements IObserver, IView {
    private static readonly NewsAmount = 3;
    private static readonly MeasurementsAmount = 2;
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const incomingArticles = observable.getArticles();
            const relevantArticles = incomingArticles.slice(
                Math.max(incomingArticles.length - DesktopView.NewsAmount, 0)
            );
            if (!changed(this.articles, relevantArticles)) {
                return;
            }
            this.articles = relevantArticles;
        } else if (observable instanceof WeatherState) {
            const incomingMeasurements = observable.getMeasurements();
            const relevantMeasurements = incomingMeasurements.slice(
                Math.max(incomingMeasurements.length - DesktopView.MeasurementsAmount, 0)
            );
            if (!changed(this.measurements, relevantMeasurements)) {
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
        console.log(`<div class="desktop">\n${articles.concat(reports).join('\n')}\n</div>`);
    }
}
