import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { contentCollection } from './viewer';

export class MobileView implements IObserver, IView {
    private readonly countOfArticles = 1;
    private readonly countOfMeasurements = 1;
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
        console.log(contentCollection('mobile', this.articles, this.measurements));
    }
}
