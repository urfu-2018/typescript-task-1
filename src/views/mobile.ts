import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { Render } from '../render/index';

export class MobileView implements IObserver, IView {
    private articleCount: number = 1;
    private weatherCount: number = 1;
    private htmlClass: string = 'mobile';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private markup: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const rawArticles = observable.getArticles();
            this.articles = rawArticles.slice(rawArticles.length - this.articleCount);
        } else if (observable instanceof WeatherState) {
            const rawMeasurements = observable.getMeasurements();
            this.measurements = rawMeasurements.slice(rawMeasurements.length - this.weatherCount);
        } else {
            throw new TypeError();
        }

        this.markup = Render.createView(this.articles, this.measurements, this.htmlClass);
        this.render();
    }
    public render() {
        console.log(this.markup);
    }
}
