import { IObservable } from '../utils/observable/types';
import { IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class View implements IObserver, IView {
    private readonly newsCount: number;
    private readonly weatherMeasurementsCount: number;
    private readonly viewType: string;
    private lastNews: IArticle[] = [];
    private lastMeasuments: IMeasurement[] = [];
    private lastRenderResult = '';

    constructor(viewType: string, newsCount: number, weatherMeasurementsCount: number) {
        this.viewType = viewType;
        this.newsCount = newsCount;
        this.weatherMeasurementsCount = weatherMeasurementsCount;
    }

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            this.lastNews = (observable as NewsState).getArticles().slice(-this.newsCount);
        } else if (observable instanceof WeatherState) {
            this.lastMeasuments = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.weatherMeasurementsCount);
        } else {
            throw new TypeError('Unknown observable extension');
        }
        this.render();
    }

    public render(): void {
        const news = this.lastNews.map(n => `[${n.time}] ${n.category} - ${n.title}\n`).join('');
        const weather = this.lastMeasuments
            .map(w => `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
            .join('');

        const result = `<div class="${this.viewType}">\n${news + weather}</div>`;

        if (result !== this.lastRenderResult) {
            this.lastRenderResult = result;
            console.log(this.lastRenderResult);
        }
    }
}
