import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { equal } from 'assert';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            // const pastArticles = this.articles;
            this.articles = observable.getArticles().slice(-3);
            this.render();
        }
        if (observable instanceof WeatherState){
            this.measurements= observable.getMeasurements().slice(-2);
            this.render;
        }
    }

    public render() {
        throw new Error('Not implemented');
    }
}
