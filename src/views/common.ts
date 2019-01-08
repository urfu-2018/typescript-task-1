import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';

export class CommonView implements IObserver, IView {
    private static renderArticle(article: IArticle) {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private static renderMeasurement(measurement: IMeasurement) {
        return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
            measurement.humidity
        } U`;
    }
    protected articlesCount: number;
    protected measurementsCount: number;
    protected viewType: string;

    private articles: IArticle[];
    private measurements: IMeasurement[];
    private oldMarkup: string;

    constructor() {
        this.articles = [];
        this.measurements = [];
        this.oldMarkup = '';
        this.articlesCount = 0;
        this.measurementsCount = 0;
        this.viewType = '';
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = (observable as NewsState).getArticles().slice(-this.articlesCount);
        } else if (observable instanceof WeatherState) {
            this.measurements = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.measurementsCount);
        } else {
            throw new TypeError();
        }
        this.render();
    }

    public render() {
        const renderedNews = this.articles.map(CommonView.renderArticle);
        const renderedWeather = this.measurements.map(CommonView.renderMeasurement);
        const rendered = renderedNews.concat(renderedWeather).join('\n');
        const newMarkup = `<div class=${this.viewType}>\n${rendered}\n</div>`;
        if (newMarkup !== this.oldMarkup) {
            this.oldMarkup = newMarkup;
            console.log(newMarkup);
        }
    }
}
