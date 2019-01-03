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
            const newArticles = newsState.getArticles();
            if (JSON.stringify(this.articles) === JSON.stringify(newArticles)) {
                return;
            }
            this.articles = newArticles;
        }
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            const newMeasurements = weatherState.getMeasurements();
            if (JSON.stringify(this.measurements) === JSON.stringify(newMeasurements)) {
                return;
            }
            this.measurements = weatherState.getMeasurements();
        }
        this.render();
    }

    public render() {
        const lastArticles = this.articles.slice(-1);
        const lastMeasurements = this.measurements.slice(-1);
        console.log(Helpers.getRenderedView(ViewType.Mobile, lastArticles, lastMeasurements));
    }
}
