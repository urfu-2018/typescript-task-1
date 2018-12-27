import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { RenderDataProvider } from './render-data';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private _newsData: string = '';
    private _weatherData: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.newsData = RenderDataProvider.provideArticles(observable, 1);
        }
        if (observable instanceof WeatherState) {
            this.weatherData = RenderDataProvider.provideMeasurements(observable, 1);
        }
        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.newsData}${this.weatherData}</div>`);
    }

    get newsData(): string {
        return this._newsData;
    }

    set newsData(value: string) {
        this._newsData = value;
    }

    get weatherData(): string {
        return this._weatherData;
    }

    set weatherData(value: string) {
        this._weatherData = value;
    }
}
