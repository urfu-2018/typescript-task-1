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

    protected constructor(newsCount: number, measurementsCount: number, className: string) {
        this.newsCount = newsCount;
        this.measurementsCount = measurementsCount;
        this.className = className;
    }

    public update(observable: IObservable) {
        let needRender = false;

        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            const measurements = weatherState.getMeasurements();
            needRender =
                needRender || !this.equals(this.weather, measurements, this.measurementEquals);
            this.weather = measurements;
        }
        if (observable instanceof NewsState) {
            const weatherState = observable as NewsState;
            const news = weatherState.getArticles();
            needRender = needRender || !this.equals(this.news, news, this.articleEquals);
            this.news = news;
        }

        if (needRender) {
            this.render();
        }
    }

    public render() {
        let content = `<div class="${this.className}">\n`;
        content += this.news
            .slice(0, this.newsCount)
            .map(x => `[${x.time}] ${x.category} - ${x.title}\n`);
        content += this.weather
            .slice(0, this.measurementsCount)
            .map(x => `[${x.time}] ${x.temperature} C, ${x.pressure} P, ${x.humidity} U\n`);
        content += `</div>`;

        console.log(content);
    }

    private equals<T>(arr1: T[], arr2: T[], cmp: (x: T, y: T) => boolean): boolean {
        return arr1.length === arr2.length && arr1.every((v, i) => cmp(v, arr2[i]));
    }

    private measurementEquals(x: IMeasurement, y: IMeasurement): boolean {
        return (
            x.humidity === y.humidity &&
            x.pressure === y.pressure &&
            x.temperature === y.temperature &&
            x.time === x.time
        );
    }

    private articleEquals(x: IArticle, y: IArticle): boolean {
        return x.category === y.category && x.time === y.time && x.title === y.title;
    }
}
