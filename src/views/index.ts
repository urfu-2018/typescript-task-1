import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IView } from './types';
import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class View implements IView, IObserver {
    protected measurements = new Array<IMeasurement>();
    protected articles = new Array<IArticle>();
    protected measurementsLimit = 0;
    protected articlesLimit = 0;
    protected className = '';

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const oldArticles = this.articles;
            const articles = observable.getArticles();
            this.articles = articles.slice(-this.articlesLimit);

            if (!this.shallowEquals(oldArticles, this.articles)) {
                this.render();
            }
        } else if (observable instanceof WeatherState) {
            const oldMeasurements = this.measurements;
            const measurements = observable.getMeasurements();
            this.measurements = measurements.slice(-this.measurementsLimit);

            if (!this.shallowEquals(oldMeasurements, this.measurements)) {
                this.render();
            }
        } else {
            throw new TypeError('Unsupported state type!');
        }
    }

    public render(): void {
        const block = this.renderBlock();
        console.log(block);
    }

    private shallowEquals<T>(a: T[], b: T[]): boolean {
        return a.length === b.length && a.every((val, i) => val === b[i]);
    }

    private renderArticle({ time, category, title }: IArticle): string {
        return `[${time}] ${category} - ${title}`;
    }

    private renderMeasurement({ time, pressure, humidity, temperature }: IMeasurement): string {
        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
    }

    private renderBlock(): string {
        const openTag = `<div class="${this.className}">`;
        const closeTag = '</div>';
        const renderedArticles = this.articles.map(this.renderArticle);
        const renderedMeasurements = this.measurements.map(this.renderMeasurement);

        return [openTag, ...renderedArticles, ...renderedMeasurements, closeTag].join('\n');
    }
}
