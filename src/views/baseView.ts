import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export abstract class BaseView implements IObserver, IView {
    private static renderMeasurement(measurement: IMeasurement): string {
        return (
            `[${measurement.time}] ${measurement.temperature} C, ` +
            `${measurement.pressure} P, ${measurement.humidity} U`
        );
    }

    private static renderArticle(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private static getSortedByTime<T extends IArticle | IMeasurement>(objects: T[]): T[] {
        const objectsCopy = objects.slice();
        objectsCopy.sort((first, second) => {
            if (first.time < second.time) {
                return -1;
            }
            return first.time > second.time ? 1 : 0;
        });

        return objectsCopy;
    }

    protected lastMeasurements: IMeasurement[];
    protected lastArticles: IArticle[];
    private readonly showMeasurements: number;
    private readonly showArticles: number;
    private lastRendered: string;

    protected constructor(showMeasurements: number, showArticles: number) {
        this.showMeasurements = showMeasurements;
        this.showArticles = showArticles;
        this.lastMeasurements = [];
        this.lastArticles = [];
        this.lastRendered = '';
    }

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.lastMeasurements = BaseView.getSortedByTime(observable.getMeasurements()).slice(
                -this.showMeasurements
            );
        } else if (observable instanceof NewsState) {
            this.lastArticles = BaseView.getSortedByTime(observable.getArticles()).slice(
                -this.showArticles
            );
        } else {
            throw new Error('Unknown IObservable type');
        }
        this.render();
    }

    public render() {
        const lines = [];
        lines.push(`<div class="${this.getViewName()}">`);
        for (const measurement of this.lastMeasurements) {
            lines.push(BaseView.renderMeasurement(measurement));
        }
        for (const article of this.lastArticles) {
            lines.push(BaseView.renderArticle(article));
        }
        lines.push(`</div>`);
        const rendered = lines.join('\n');
        if (rendered !== this.lastRendered) {
            this.lastRendered = rendered;
            console.log(rendered);
        }
    }

    protected abstract getViewName(): string;
}
