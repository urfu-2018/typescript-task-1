import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { areArraysEqual } from './helpers';

export class ViewState {
    public articles: IArticle[] = [];
    public measurements: IMeasurement[] = [];

    public update(observable: IObservable): boolean {
        if (observable instanceof NewsState) {
            const newArticles = observable.getArticles();
            if (areArraysEqual(this.articles, newArticles)) {
                return false;
            }
            this.articles = newArticles;
        }
        if (observable instanceof WeatherState) {
            const newMeasurements = observable.getMeasurements();
            if (areArraysEqual(this.measurements, newMeasurements)) {
                return false;
            }
            this.measurements = newMeasurements;
        }

        return true;
    }
}
