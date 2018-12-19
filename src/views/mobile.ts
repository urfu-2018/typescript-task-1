import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class MobileView implements IObserver, IView {
    private weather: IMeasurement[] = [];
    private news: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.weather = (observable as WeatherState).getMeasurements();
        } else if (observable instanceof NewsState) {
            const newState = observable as NewsState;
            this.news = newState.getArticles();
        }

        this.render();
    }

    public render() {
        let content = `<div class="mobile">\n`;
        if (this.news.length > 0) {
            const news = this.news[this.news.length - 1];
            content += `[${news.time}] ${news.category} - ${news.title}\n`;
        }

        if (this.weather.length > 0) {
            const weather = this.weather[this.weather.length - 1];
            // tslint:disable-next-line
            content += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${weather.humidity} U\n`;
        }

        content += `</div>`;

        console.log(content);
    }
}
