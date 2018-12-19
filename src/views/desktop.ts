import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class DesktopView implements IObserver, IView {
    private weather: IMeasurement[] = [];
    private news: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            const weatherState = observable as WeatherState;
            this.weather = weatherState.getMeasurements();
        } else if (observable instanceof NewsState) {
            const newState = observable as NewsState;
            this.news = newState.getArticles();
        }

        this.render();
    }

    public render() {
        let content = `<div class="desktop">\n`;
        const newsCount = Math.min(3, this.news.length);
        for (let i = this.news.length - newsCount; i < this.news.length; i++) {
            const news = this.news[i];
            content += `[${news.time}] ${news.category} - ${news.title}\n`;
        }

        const weatherCount = Math.min(2, this.weather.length);
        for (let i = this.weather.length - weatherCount; i < this.weather.length; i++) {
            const weather = this.weather[i];
            // tslint:disable-next-line
            content += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${weather.humidity} U\n`;
        }
        content += `</div>`;

        console.log(content);
    }
}
