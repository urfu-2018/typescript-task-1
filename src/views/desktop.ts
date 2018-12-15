import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { prepareView, EffectiveLogView } from '../utils/viewUtils';

export class DesktopView extends EffectiveLogView implements IObserver {
    private static articlesSize: number = 3;
    private static measurementsSize: number = 2;
    private static htmlClass: string = 'desktop';

    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();

            this.lastArticles = articles.slice(articles.length - DesktopView.articlesSize);
        } else if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();

            this.lastMeasurements = measurements.slice(
                measurements.length - DesktopView.measurementsSize
            );
        } else {
            return;
        }
        const markup = prepareView(DesktopView.htmlClass, this.lastMeasurements, this.lastArticles);

        this.effectiveRender(markup);
    }
}
