import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { Render } from '../render/index';

export class Device implements IObserver, IView {
    protected articleCount: number = 0;
    protected weatherCount: number = 0;
    protected htmlClass: string = 'device';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const lastArticles = this.articles;
            const rawArticles = observable.getArticles();
            this.articles = rawArticles.slice(rawArticles.length - this.articleCount);
            if (this.isNeedRender(lastArticles, this.articles)) {
                this.render();
            }
        } else if (observable instanceof WeatherState) {
            const lastMeasurements = this.measurements;
            const rawMeasurements = observable.getMeasurements();
            this.measurements = rawMeasurements.slice(rawMeasurements.length - this.weatherCount);
            if (this.isNeedRender(lastMeasurements, this.measurements)) {
                this.render();
            }
        } else {
            throw new TypeError();
        }
    }

    public render() {
        const markup = Render.createView(this.articles, this.measurements, this.htmlClass);
        console.log(markup);
    }

    private isNeedRender<T>(oldCollection: T[], newCollection: T[]): boolean {
        if (
            oldCollection.length === newCollection.length &&
            oldCollection.every((value, index) => value === newCollection[index])
        ) {
            return false;
        }

        return true;
    }
}
