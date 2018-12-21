import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';

export abstract class View implements IObserver, IView {
    public readonly viewType: string;
    private weather: IMeasurement[] = [];
    private news: IArticle[] = [];
    private countNews: number;
    private countMeasurements: number;
    private rendition: string = '';

    protected constructor(countNews: number, countMeasurements: number, viewType: string) {
        this.countNews = countNews;
        this.countMeasurements = countMeasurements;
        this.viewType = viewType;
    }

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.weather = (observable as WeatherState).getMeasurements();
        } else if (observable instanceof NewsState) {
            this.news = (observable as NewsState).getArticles();
        } else {
            throw new TypeError();
        }
        this.render();
    }

    public render() {
        const rendition =
            `<div class="${this.viewType}">\n` +
            this.weather
                .slice(-this.countMeasurements)
                .map(
                    weather =>
                        `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                            weather.humidity
                        } U\n`
                )
                .join('') +
            this.news
                .slice(-this.countNews)
                .map(nextNew => `[${nextNew.time}] ${nextNew.category} - ${nextNew.title}\n`)
                .join('') +
            `</div>`;

        if (rendition !== this.rendition) {
            console.log(rendition);
            this.rendition = rendition;
        }
    }
}
