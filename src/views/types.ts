import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export interface IView {
    render(): void;
}

export abstract class View implements IObserver, IView {
    protected states: {
        news: IArticle[];
        weather: IMeasurement[];
    } = {
        news: [],
        weather: []
    };

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            // typeof
            const newArticles = (observable as NewsState).getArticles();
            this.states.news = newArticles;
        } else if (observable instanceof WeatherState) {
            const newMeasurements = (observable as WeatherState).getMeasurements();
            this.states.weather = newMeasurements;
        } else {
            throw new Error('Not implemented');
        }
        this.render();
    }

    public abstract render(): void;
}
