import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';
import { Updatable } from './updatable';

export class DesktopView extends Updatable implements IObserver {
    protected view: string = 'desktop';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.updateNews(articles.slice(articles.length - 3));
        }
        if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();
            this.updateWeather(measurements.slice(measurements.length - 2));
        }
    }
}
