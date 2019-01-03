import { IObservable, IObserver } from '../utils/observable/types';
import { IView, ViewType } from './types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { Helpers } from './helpers';

export class MobileView implements IObserver, IView {
    public articles: IArticle[] = [];
    public measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const newsState = observable as NewsState;
            this.articles = newsState.getArticles();
        }
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            this.measurements = weatherState.getMeasurements();
        }
        this.render();
    }

    public render() {
        const lastArticles = Helpers.getFewLastElements(this.articles, 1);
        const lastMeasurements = Helpers.getFewLastElements(this.measurements, 1);
        console.log(Helpers.getRenderedView(ViewType.Mobile, lastArticles, lastMeasurements));
    }
}
