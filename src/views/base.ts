import { IObservable, IObserver } from '../utils/observable/types';
import { isINewsState, IArticle } from '../state/news/types';
import { isIWeatherState, IMeasurement } from '../state/weather/types';
import { IView } from './types';
import { Formatter } from './formatters';
import { addNewLineIfNotEmpty, formatArticle, formatList, formatMeasurement } from './formatters';
import { isShallowEqual } from '../utils';

export class BaseView implements IObserver, IView {
    public readonly name: string;
    public readonly articlesShowLimit: number;
    public readonly measurementsShowLimit: number;

    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    constructor(name: string, articlesShowLimit: number, measurementsShowLimit: number) {
        this.name = name;
        this.articlesShowLimit = articlesShowLimit;
        this.measurementsShowLimit = measurementsShowLimit;
    }

    public update(observable: IObservable) {
        if (isIWeatherState(observable)) {
            const measurements = observable.getMeasurements().slice(-this.measurementsShowLimit);
            if (isShallowEqual(measurements, this.measurements)) {
                return;
            }

            this.measurements = measurements;
        } else if (isINewsState(observable)) {
            const articles = observable.getArticles().slice(-this.articlesShowLimit);
            if (isShallowEqual(articles, this.articles)) {
                return;
            }

            this.articles = articles;
        } else {
            throw new TypeError('incorrect event type');
        }

        this.render();
    }

    public render(
        articleFormatter: Formatter<IArticle> = formatArticle,
        measurementFormatter: Formatter<IMeasurement> = formatMeasurement
    ) {
        let formattedArticles = formatList(this.articles, articleFormatter);
        let formattedMeasurements = formatList(this.measurements, measurementFormatter);

        formattedArticles = addNewLineIfNotEmpty(formattedArticles);
        formattedMeasurements = addNewLineIfNotEmpty(formattedMeasurements);

        console.log(
            `<div class="${this.name}">\n${formattedArticles}${formattedMeasurements}</div>`
        );
    }
}
