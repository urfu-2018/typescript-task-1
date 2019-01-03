import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { ViewType } from './types';

export class ViewState {
    public viewType: ViewType;
    public articles: IArticle[] = [];
    public measurements: IMeasurement[] = [];

    constructor(viewType: ViewType) {
        this.viewType = viewType;
    }

    public update(observable: IObservable): boolean {
        if (observable instanceof NewsState) {
            const newsState = observable as NewsState;
            const newArticles = newsState.getArticles();
            if (JSON.stringify(this.articles) === JSON.stringify(newArticles)) {
                return false;
            }
            this.articles = newArticles;
        }
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            const newMeasurements = weatherState.getMeasurements();
            if (JSON.stringify(this.measurements) === JSON.stringify(newMeasurements)) {
                return false;
            }
            this.measurements = weatherState.getMeasurements();
        }

        return true;
    }
}
