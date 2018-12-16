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
            this.weather = weatherState.getMeasurements();
        } else if (observable instanceof NewsState) {
            const newState = observable as NewsState;
            this.news = newState.getArticles();
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render() {
        const html = this.getHtml();

        if (html !== this.html) {
            console.log(html);
            this.html = html;
        }
    }

    public getHtml() {
        let content = `<div class="${this.className}">\n`;

        content += this.news
            .slice(-this.newsCount)
            .map(x => `[${x.time}] ${x.category} - ${x.title}\n`)
            .join('');

        content += this.weather
            .slice(-this.measurementsCount)
            .map(x => `[${x.time}] ${x.temperature} C, ${x.pressure} P, ${x.humidity} U\n`)
            .join('');

        content += `</div>`;

        return content;
    }
}
