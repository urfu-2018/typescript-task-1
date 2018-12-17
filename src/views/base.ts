import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { renderArticle, renderMeasurement } from './renderers';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { shallowEqual } from '../utils/compare';

interface IViewParameters {
    newsLimit: number;
    measurementsLimit: number;
    divClass: string;
}

export class BaseView implements IObserver, IView {
    private readonly newsLimit: number;
    private readonly measurementsLimit: number;
    private readonly divClass: string;

    private news: IArticle[] = [];
    private weather: IMeasurement[] = [];

    constructor(parameters: IViewParameters) {
        this.divClass = parameters.divClass;
        this.measurementsLimit = parameters.measurementsLimit;
        this.newsLimit = parameters.newsLimit;
    }

    public update(observable: IObservable) {
        const source = observable;
        let shouldRender = false;

        if (source instanceof NewsState) {
            const freshNews = source.getArticles().slice(-this.newsLimit);

            if (!shallowEqual(this.news, freshNews)) {
                this.news = freshNews;
                shouldRender = true;
            }
        } else if (source instanceof WeatherState) {
            const freshMeasurements = source.getMeasurements().slice(-this.measurementsLimit);

            if (!shallowEqual(this.weather, freshMeasurements)) {
                this.weather = freshMeasurements;
                shouldRender = true;
            }
        }

        if (shouldRender) {
            this.render();
        }
    }

    public render() {
        const content = [...this.news.map(renderArticle), ...this.weather.map(renderMeasurement)];

        console.log(`<div class="${this.divClass}">\n${content.join('\n')}\n</div>`);
    }
}
