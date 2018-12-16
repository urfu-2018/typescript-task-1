import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';

export abstract class View implements IObserver, IView {
    private weather: IMeasurement[] = [];
    private news: IArticle[] = [];
    private newsCount: number;
    private measurementsCount: number;
    private className: string;
    private html?: string = undefined;

    protected constructor(newsCount: number, measurementsCount: number, className: string) {
        this.newsCount = newsCount;
        this.measurementsCount = measurementsCount;
        this.className = className;
    }

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            const measurements = weatherState.getMeasurements();
            this.weather = measurements;
        }
        if (observable instanceof NewsState) {
            const weatherState = observable as NewsState;
            const news = weatherState.getArticles();
            this.news = news;
        }

        this.render();
    }

    public render() {
        const html = this.getHtml();

        if (this.html !== html) {
            console.log(html);
            this.html = html;
        }
    }

    public getHtml(): string {
        let content = `<div class="${this.className}">\n`;

        content += this.news
            .slice(this.news.length - this.newsCount)
            .map(x => `[${x.time}] ${x.category} - ${x.title}\n`);

        content += this.weather
            .slice(this.weather.length - this.measurementsCount)
            .map(x => `[${x.time}] ${x.temperature} C, ${x.pressure} P, ${x.humidity} U\n`);

        content += `</div>`;

        return content;
    }
}
