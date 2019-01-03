import { IObservable, IObserver } from '../utils/observable/types';
import { IView, ViewType } from './types';
import { Helpers } from './helpers';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
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
        const articles = this.articles.slice(-3);
        const measurements = this.measurements.slice(-2);
        console.log(Helpers.getRenderedView(ViewType.Desktop, articles, measurements));
    }
}
