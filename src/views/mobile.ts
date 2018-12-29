import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { RenderDataProvider } from './render-data';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private newsData = '';
    private weatherData = '';

    public update(observable: IObservable) {
        const ARTICLES_COUNT = 3;
        const WEATHER_COUNT = 2;
        if (observable instanceof NewsState) {
            this.newsData = RenderDataProvider.provideArticles(observable, ARTICLES_COUNT);
        }
        if (observable instanceof WeatherState) {
            this.weatherData = RenderDataProvider.provideMeasurements(observable, WEATHER_COUNT);
        }
        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.newsData}${this.weatherData}</div>`);
    }
}
