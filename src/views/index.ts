import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export abstract class BaseView implements IObserver, IView {
    protected abstract measurementsCount: number;
    protected abstract articlesCount: number;
    protected abstract deviceType: string;

    private measurements: IMeasurement[] = [];
    private articles: IArticle[] = [];

    public update(observable: IObservable) {
        let needUpdate = true;
        let currentUpdate: IMeasurement[] | IArticle[];

        if (observable instanceof WeatherState) {
            currentUpdate = this.getMeasurements(observable);
            needUpdate = this.needUpdate(
                this.measurements,
                currentUpdate,
                this.measurementEquality
            );

            this.measurements = currentUpdate;
        } else if (observable instanceof NewsState) {
            currentUpdate = this.getArticles(observable);
            needUpdate = this.needUpdate(this.articles, currentUpdate, this.articleEquality);
            this.articles = currentUpdate;
        }

        if (needUpdate) {
            this.render();
        }
    }

    public render(): void {
        console.log(`<div class="${this.deviceType}">\n${this.getContent()}\n</div>`);
    }

    private needUpdate<T>(
        lastUpdate: T[],
        currentUpdate: T[],
        equality: (last: T, current: T) => boolean
    ) {
        if (lastUpdate.length !== currentUpdate.length) {
            return true;
        }

        return lastUpdate.some((value, index) => !equality(value, currentUpdate[index]));
    }

    private measurementEquality(first: IMeasurement, second: IMeasurement) {
        return (
            first.humidity === second.humidity &&
            first.pressure === second.pressure &&
            first.temperature === second.temperature &&
            first.time === second.time
        );
    }

    private articleEquality(first: IArticle, second: IArticle) {
        return (
            first.category === second.category &&
            first.time === second.time &&
            first.title === second.title
        );
    }

    private getContent(): string {
        const articlesContents = this.articles.map(this.renderArticle);
        const measurementsContents = this.measurements.map(this.renderMeasurement);

        return [...articlesContents, ...measurementsContents].join('\n');
    }

    private getArticles(newsState: NewsState): IArticle[] {
        return newsState.getArticles().slice(-this.articlesCount);
    }

    private getMeasurements(weatherState: WeatherState): IMeasurement[] {
        return weatherState.getMeasurements().slice(-this.measurementsCount);
    }

    private renderArticle(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private renderMeasurement(measurement: IMeasurement): string {
        return (
            `[${measurement.time}] ${measurement.temperature} C,` +
            ` ${measurement.pressure} P, ${measurement.humidity} U`
        );
    }
}
