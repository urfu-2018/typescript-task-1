import { IObservable } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export abstract class GlobalView implements IView {
    protected weather: IMeasurement[] = [];
    protected news: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.weather = (observable as WeatherState).getMeasurements();
        } else {
            this.news = (observable as NewsState).getArticles();
        }

        this.render();
    }

    public abstract render(): void;
}
