import { IObservable, IObserver } from '../utils/observable/types';
import { Updatable } from './updatable';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView extends Updatable implements IObserver {
    protected view: string = 'mobile';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.updateNews(articles.slice(articles.length - 1));
        }
        if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();
            this.updateWeather(measurements.slice(measurements.length - 1));
        }
    }
}
