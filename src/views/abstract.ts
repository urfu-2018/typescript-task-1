import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export abstract class AbstractView implements IObserver, IView {
    protected abstract articlesCount: number;
    protected abstract measurementsCount: number;
    protected abstract viewType: string;

    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private markupCode: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.articlesCount);
            this.render();
            return;
        }
        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.measurementsCount);
            this.render();
            return;
        }
        throw TypeError();
    }

    public render() {
        const renderedArticles = this.renderArticles();
        const renderedMeasurements = this.renderMeasurements();
        const representation = renderedArticles.concat(renderedMeasurements).join('\n');
        this.updateMarkupCode(representation);
    }

    private renderArticles(): string[] {
        return this.articles.map(
            article => `[${article.time}] ${article.category} - ${article.title}`
        );
    }

    private renderMeasurements(): string[] {
        return this.measurements.map(measurement => {
            return `[${measurement.time}] ${measurement.temperature} C, ${
                measurement.pressure
            } P, ${measurement.humidity} U`;
        });
    }

    private updateMarkupCode(data: string) {
        const newMarkupCode = `<div class="${this.viewType}">\n${data}\n</div>`;
        if (this.markupCode !== newMarkupCode) {
            this.markupCode = newMarkupCode;
            console.log(this.markupCode);
        }
    }
}
