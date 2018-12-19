import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export abstract class AbstractView implements IObserver, IView {
    protected abstract articlesCount: number;
    protected abstract measurementsCount: number;
    protected abstract viewType: string;

    private _articles: IArticle[] = [];
    private _measurements: IMeasurement[] = [];
    private _markupCode: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this._articles = observable.getArticles().slice(-this.articlesCount);
            this.render();
            return;
        }
        if (observable instanceof WeatherState) {
            this._measurements = observable.getMeasurements().slice(-this.measurementsCount);
            this.render();
            return;
        }
        throw TypeError();
    }

    public render() {
        const renderedArticles = this.renderArticles();
        const renderedMeasurements = this.renderMeasurements();
        const representation = this.getRepresentation(
            renderedArticles.concat(renderedMeasurements)
        );
        this.updateMarkupCode(representation);
    }

    private renderArticles(): string[] {
        return this._articles.map(
            article => `[${article.time}] ${article.category} - ${article.title}`
        );
    }

    private renderMeasurements(): string[] {
        return this._measurements.map(measurement => {
            return `[${measurement.time}] ${measurement.temperature} C, ${
                measurement.pressure
            } P, ${measurement.humidity} U`;
        });
    }

    private getRepresentation(data: string[]): string {
        return data.join('\n');
    }

    private updateMarkupCode(data: string) {
        const newMarkupCode = `<div class="${this.viewType}">\n${data}\n</div>`;
        if (this._markupCode !== newMarkupCode) {
            this._markupCode = newMarkupCode;
            console.log(this._markupCode);
        }
    }
}
