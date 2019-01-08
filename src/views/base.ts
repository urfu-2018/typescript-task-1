import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';
import { areArraysEqual } from './shallowCompare';

export abstract class BaseView implements IObserver, IView {
    private static fetchNews(article: IArticle) {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private static fetchWeather(value: IMeasurement) {
        return `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${value.humidity} U`;
    }

    private readonly name: string;
    private readonly newsLimit: number;
    private readonly weatherLimit: number;

    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    constructor(name: string, newsLimit: number, weatherLimit: number) {
        this.name = name;
        this.newsLimit = newsLimit;
        this.weatherLimit = weatherLimit;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const newArticles = observable
                .getArticles()
                .slice(this.articles.length - this.newsLimit);
            if (areArraysEqual(this.articles, newArticles)) {
                return;
            }
            this.articles = newArticles;
        } else if (observable instanceof WeatherState) {
            const newMeasurements = observable
                .getMeasurements()
                .slice(this.measurements.length - this.weatherLimit);
            if (areArraysEqual(this.measurements, newMeasurements)) {
                return;
            }
            this.measurements = newMeasurements;
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render() {
        const news = this.articles.map(BaseView.fetchNews);
        const weather = this.measurements.map(BaseView.fetchWeather);

        const content = news.concat(weather).join('\n');
        const result = `<div class="${this.name}">\n${content}\n</div>`;
        console.log(result);
    }
}
