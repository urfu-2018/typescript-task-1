import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class GeneralView implements IObserver, IView {
    protected countArticles: number = 0;
    protected countMeasurements: number = 0;
    protected className: string = '';
    private measurements: IMeasurement[] = [];
    private articles: IArticle[] = [];
    private lastResult: string = '';

    public update(observable: IObservable): void {
        if (observable instanceof WeatherState) {
            this.measurements = observable
                .getMeasurements()
                .slice(this.measurements.length - this.countMeasurements);
        } else if (observable instanceof NewsState) {
            this.articles = observable
                .getArticles()
                .slice(this.articles.length - this.countArticles);
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render(): void {
        const result = this.renderWrapper();
        if (this.lastResult !== result) {
            this.lastResult = result;
            console.log(result);
        }
    }

    private renderWrapper(): string {
        const articles = this.articles.map(this.presentArticle);
        const measurements = this.measurements.map(this.presentMeasurement);
        const result = `<div class="${this.className}">\n${articles
            .concat(measurements)
            .join('\n')}\n</div>`;
        return result;
    }

    private presentArticle(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private presentMeasurement(value: IMeasurement): string {
        return `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${value.humidity} U`;
    }
}
