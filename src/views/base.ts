import { IObservable, IObserver } from '../utils/observable/types';
import { isINewsState, IArticle } from '../state/news/types';
import { isIWeatherState, IMeasurement } from '../state/weather/types';
import { IView } from './types';
import { Formatter } from './formatters';
import { addNewLineIfNotEmpty, formatArticle, formatList, formatMeasurement } from './formatters';

export class BaseView implements IObserver, IView {
    private lastArticles: IArticle[] = [];
    private lastMeasurements: IMeasurement[] = [];
    private lastRenderedData?: string;

    constructor(
        public readonly name: string,
        public readonly articlesShowLimit: number,
        public readonly measurementsShowLimit: number,
        private articleFormatter: Formatter<IArticle> = formatArticle,
        private measurementFormatter: Formatter<IMeasurement> = formatMeasurement
    ) {}

    public update(observable: IObservable) {
        if (isIWeatherState(observable)) {
            this.lastMeasurements = observable.getMeasurements().slice(-this.measurementsShowLimit);
        } else if (isINewsState(observable)) {
            this.lastArticles = observable.getArticles().slice(-this.articlesShowLimit);
        } else {
            throw new TypeError('incorrect event type');
        }

        const newData = this.getDataRepresentation();
        if (newData !== this.lastRenderedData) {
            this.lastRenderedData = newData;
            this.render();
        }
    }

    public render() {
        console.log(this.lastRenderedData);
    }

    private getDataRepresentation(): string {
        let formattedArticles = formatList(this.lastArticles, this.articleFormatter);
        let formattedMeasurements = formatList(this.lastMeasurements, this.measurementFormatter);

        formattedArticles = addNewLineIfNotEmpty(formattedArticles);
        formattedMeasurements = addNewLineIfNotEmpty(formattedMeasurements);

        return `<div class="${this.name}">\n${formattedArticles}${formattedMeasurements}</div>`;
    }
}
