import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export interface IView {
    render(): void;
}

export class View implements IView {
    public news: IArticle[];
    public weather: IMeasurement[];
    private readonly type: string;
    private newsCount: number;
    private weatherCount: number;

    constructor(
        type: string,
        news: IArticle[],
        weather: IMeasurement[],
        newsCount: number,
        weatherCount: number
    ) {
        this.type = type;
        this.news = news;
        this.newsCount = newsCount;
        this.weather = weather;
        this.weatherCount = weatherCount;
    }

    public getFormattedNewsAndWeather() {
        const formattedNews = this.getFormattedNews();
        const formattedWeather = this.getFormattedWeather();
        const newsAndWeather: string = formattedNews.concat(formattedWeather).join('\n');
        return `<div class="${this.type}">\n${newsAndWeather}\n</div>`;
    }

    public render(): void {
        console.log(this.getFormattedNewsAndWeather());
    }

    public arraysEquals(first: any[], second: any[]) {
        return first.length === second.length && first.every((n, i) => n === second[i]);
    }

    public update(observable: IObservable) {
        let shouldRender: boolean = false;
        if (observable instanceof NewsState) {
            const lastNews = observable.getArticles();
            if (!this.arraysEquals(this.news, lastNews)) {
                shouldRender = true;
                this.news = lastNews;
            }
        }
        if (observable instanceof WeatherState) {
            const lastWeather = observable.getMeasurements();
            if (!this.arraysEquals(this.weather, lastWeather)) {
                shouldRender = true;
                this.weather = lastWeather;
            }
        }
        if (shouldRender) {
            this.render();
        }
    }

    private getFormattedNews() {
        const formattedNews: string[] = [];
        this.news
            .slice(this.news.length - this.newsCount)
            .forEach(n => formattedNews.push(`[${n.time}] ${n.category} - ${n.title}`));
        return formattedNews;
    }

    private getFormattedWeather() {
        const formattedWeather: string[] = [];
        this.weather
            .slice(this.weather.length - this.weatherCount)
            .forEach(w =>
                formattedWeather.push(
                    `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U`
                )
            );
        return formattedWeather;
    }
}
