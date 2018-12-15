import { IObservable, IObserver } from '../utils/observable/types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { prepareView, EffectiveLogView } from '../utils/viewUtils';

export class MobileView extends EffectiveLogView implements IObserver {
    private static articlesSize: number = 1;
    private static measurementsSize: number = 1;
    private static htmlClass: string = 'mobile';

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
        const markup = prepareView(MobileView.htmlClass, this.lastMeasurements, this.lastArticles);

        this.effectiveRender(markup);
    }
}
