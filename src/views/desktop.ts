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
            this.articles = newsState.getArticles();
        }
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            this.measurements = weatherState.getMeasurements();
        }
        this.render();
    }

    public render() {
        const articles = Helpers.getFewLastElements(this.articles, 3).reverse();
        const measurements = Helpers.getFewLastElements(this.measurements, 2).reverse();
        console.log(Helpers.getRenderedView(ViewType.Desktop, articles, measurements));
    }
}
