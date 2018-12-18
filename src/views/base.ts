import { IObservable, IObserver } from '../utils/observable/types';
import { isINewsState, IArticle } from '../state/news/types';
import { isIWeatherState, IMeasurement } from '../state/weather/types';
import { IView } from './types';
import { Formatter } from './formatters';
import { addNewLineIfNotEmpty, formatArticle, formatList, formatMeasurement } from './formatters';

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
            this.measurements = observable.getMeasurements().slice(-this.measurementsShowLimit);
        } else if (isINewsState(observable)) {
            this.articles = observable.getArticles().slice(-this.articlesShowLimit);
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
