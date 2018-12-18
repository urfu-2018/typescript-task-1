import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news/index';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather/index';
import { IMeasurement } from '../state/weather/types';

export abstract class BaseView implements IObserver, IView {
    private static renderArticle(item: IArticle) {
        return `[${item.time}] ${item.category} - ${item.title}`;
    }

    private static renderMeasurement(item: IMeasurement) {
        return `[${item.time}] ${item.temperature} C, ${item.pressure} P, ${item.humidity} U`;
    }

    protected abstract articlesCount: number;
    protected abstract measurementsCount: number;
    protected abstract typeName: string;

    private previousMarkup: string = '';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.articlesCount);
        } else if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.measurementsCount);
        } else {
            throw TypeError();
        }
        this.render();
    }

    public render() {
        const articles = this.articles.map(BaseView.renderArticle);
        const measurements = this.measurements.map(BaseView.renderMeasurement);
        const reports = articles.concat(measurements).join('\n');
        const markup = `<div class="${this.typeName}">\n${reports}\n</div>`;
        if (this.previousMarkup !== markup) {
            console.log(markup);
            this.previousMarkup = markup;
        }
    }
}
