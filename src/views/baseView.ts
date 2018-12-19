import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class BaseView implements IObserver, IView {
    private static prepareNews(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private static prepareWeather(measurement: IMeasurement): string {
        return (
            `[${measurement.time}] ${measurement.temperature} C, ` +
            `${measurement.pressure} P, ${measurement.humidity} U`
        );
    }

    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private prevRender: string = '';
    private readonly name: string;
    private readonly newsLimit: number;
    private readonly weatherLimit: number;

    constructor(name: string, newsLimit: number, weatherLimit: number) {
        this.name = name;
        this.newsLimit = newsLimit;
        this.weatherLimit = weatherLimit;
    }

    public render(): void {
        const news = this.articles
            .slice(this.articles.length - this.newsLimit)
            .map(BaseView.prepareNews);
        const weather = this.measurements
            .slice(this.measurements.length - this.weatherLimit)
            .map(BaseView.prepareWeather);

        const toRender = news.concat(weather).join('\n');
        const result = `<div class="${this.name}">\n${toRender}\n</div>`;

        if (this.prevRender !== toRender) {
            console.log(result);
            this.prevRender = toRender;
        }
    }

    public update(observable: IObservable): void {
        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements();
        }

        if (observable instanceof NewsState) {
            this.articles = observable.getArticles();
        }

        this.render();
    }
}
