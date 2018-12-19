import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export abstract class View implements IObserver, IView {
    protected abstract measurementsCount: number;
    protected abstract articlesCount: number;
    protected abstract deviceType: string;

    private measurements: IMeasurement[] = [];
    private articles: IArticle[] = [];

    private content: string = '';

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.measurements = this.getMeasurements(observable);
        } else if (observable instanceof NewsState) {
            this.articles = this.getArticles(observable);
        }

        const newContent = this.getContent();
        if (newContent !== this.content) {
            this.content = newContent;
            this.render();
        }
    }

    public render() {
        console.log(`<div class="${this.deviceType}">\n${this.content}\n</div>`);
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
