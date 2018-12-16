import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class BaseView implements IObserver, IView {
    private readonly newsCount: number;
    private readonly weatherCount: number;
    private readonly format: string;
    private newArticles: IArticle[];
    private newMeasurements: IMeasurement[];
    private lastMarkup: string = '';

    constructor(newsCount: number, weatherCount: number, viewFormat: string) {
        this.newArticles = [];
        this.newMeasurements = [];
        this.newsCount = newsCount;
        this.weatherCount = weatherCount;
        this.format = viewFormat;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.newArticles = observable.getArticles().slice(-this.newsCount);
        }
        if (observable instanceof WeatherState) {
            this.newMeasurements = observable.getMeasurements().slice(-this.weatherCount);
        }
        this.render();
    }

    public render() {
        let renderArticles: string = '';
        this.newArticles.forEach(article => {
            renderArticles += `[${article.time}] ${article.category} - ${article.title}\n`;
        });

        let renderMeasurements: string = '';
        this.newMeasurements.forEach(measurement => {
            renderMeasurements +=
                `[${measurement.time}] ${measurement.temperature} C, ` +
                `${measurement.pressure} P, ${measurement.humidity} U\n`;
        });

        const markup = `<div class="${this.format}">\n${renderArticles}${renderMeasurements}</div>`;
        if (markup !== this.lastMarkup) {
            console.log(markup);
            this.lastMarkup = markup;
        }
    }
}
