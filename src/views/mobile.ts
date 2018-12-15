import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { prepareView } from '../utils/viewFunctions';

export class MobileView implements IObserver, IView {
    private static articlesSize: number = 1;
    private static measurementsSize: number = 1;
    private static htmlClass: string = 'mobile';

    private markup: string = '';
    private lastMarkup: string | undefined;

    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();

            this.lastArticles = articles.slice(articles.length - MobileView.articlesSize);
        } else if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();

            this.lastMeasurements = measurements.slice(
                measurements.length - MobileView.measurementsSize
            );
        } else {
            return;
        }
        this.markup = prepareView(MobileView.htmlClass, this.lastMeasurements, this.lastArticles);

        if (!this.lastMarkup || this.lastMarkup !== this.markup) {
            this.render();

            this.lastMarkup = this.markup;
        }
    }

    public render() {
        console.log(this.markup);
    }
}
