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
    protected lastRender = '';

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.articles = articles.slice(articles.length - this.articlesLimit);
        } else if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();
            this.measurements = measurements.slice(measurements.length - this.measurementsLimit);
        } else {
            throw new TypeError('Unsupported state type!');
        }

        const block = this.renderBlock();

        if (this.lastRender === '' || this.lastRender !== block) {
            this.lastRender = block;
            this.render();
        }
    }

    public render(): void {
        console.log(this.lastRender);
    }

    private renderArticle({ time, category, title }: IArticle): string {
        return `[${time}] ${category} - ${title}`;
    }

    private renderMeasurement({ time, pressure, humidity, temperature }: IMeasurement): string {
        return `[${time}] ${temperature} C, ${pressure} P, ${humidity} U`;
    }

    private renderBlock(): string {
        const openTag = `<div> class=${this.className}>`;
        const closeTag = '</div>';
        const renderedArticles = this.articles.map(this.renderArticle);
        const renderedMeasurements = this.measurements.map(this.renderMeasurement);

        return [openTag, ...renderedArticles, ...renderedMeasurements, closeTag].join('\n');
    }
}
