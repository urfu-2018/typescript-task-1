import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export interface IView {
    render(): void;
}

export abstract class View implements IObserver, IView {
    protected states: {
        news: IArticle[];
        weather: IMeasurement[];
    } = {
        news: [],
        weather: []
    };

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            this.states.news = observable.getArticles();
        } else if (observable instanceof WeatherState) {
            this.states.weather = observable.getMeasurements();
        } else {
            throw new Error('Not implemented');
        }
        this.render();
    }

    public abstract render(): void;

    protected cutLatestNews(newsCount: number, weatherCount: number): void {
        this.states.news = this.states.news.slice(
            this.states.news.length - Math.min(newsCount, this.states.news.length)
        );
        this.states.weather = this.states.weather.slice(
            this.states.weather.length - Math.min(weatherCount, this.states.weather.length)
        );
    }

    protected renderFormat(className: string): string {
        let content = `<div class="${className}">\n`;
        this.states.news.forEach(
            news => (content += `[${news.time}] ${news.category} - ${news.title}\n`)
        );
        this.states.weather.forEach(
            weather =>
                (content += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`)
        );
        content += `</div>`;

        return content;
    }
}
