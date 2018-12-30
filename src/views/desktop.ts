import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { contentCollection } from './viewer';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private readonly countOfArticles = 3;
    private readonly countOfMeasurements = 2;
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.countOfArticles);
        }

        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.countOfMeasurements);
        }

        this.render();
    }

    public render() {
        console.log(contentCollection('desktop', this.articles, this.measurements));
    }
}
