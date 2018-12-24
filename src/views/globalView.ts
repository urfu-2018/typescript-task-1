import { IObservable } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export abstract class GlobalView implements IView {
    protected abstract maxWeatherCount: number;
    protected abstract maxNewsCount: number;
    protected abstract markupClassName: string;
    protected weather: IMeasurement[] = [];
    protected news: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.weather = (observable as WeatherState).getMeasurements();
        } else if (observable instanceof NewsState) {
            this.news = (observable as NewsState).getArticles();
        } else {
            throw new Error(`Unexpected IObservable type: ${observable.constructor.name}`);
        }

        this.render();
    }

    public render() {
        let content = `<div class="${this.markupClassName}">\n`;
        const newsCount = Math.min(this.maxNewsCount, this.news.length);
        for (let i = this.news.length - newsCount; i < this.news.length; i++) {
            const { time, category, title } = this.news[i];
            content += `[${time}] ${category} - ${title}\n`;
        }

        const weatherCount = Math.min(this.maxWeatherCount, this.weather.length);
        for (let i = this.weather.length - weatherCount; i < this.weather.length; i++) {
            const { time, temperature, pressure, humidity } = this.weather[i];
            content += `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
        }
        content += `</div>`;

        console.log(content);
    }
}
