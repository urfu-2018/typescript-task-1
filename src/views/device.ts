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

        const newMarkup = Render.createView(this.articles, this.measurements, this.htmlClass);

        if (this.isNeedRender(newMarkup)) {
            this.markup = newMarkup;
            this.render();
        }
    }

    public render() {
        console.log(this.markup);
    }

    private isNeedRender(markup: string) {
        if (this.markup !== markup || this.markup === '') {
            return true;
        }

        return false;
    }
}
