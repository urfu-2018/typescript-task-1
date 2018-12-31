import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private news: IArticle[] = [];
    private weather: IMeasurement[] = [];
    private newsCount: number = 3;
    private weatherCount: number = 2;
    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const news = observable.getArticles();
            this.news = news.slice(news.length - this.newsCount);
        } else if (observable instanceof WeatherState) {
            const weather = observable.getMeasurements();
            this.weather = weather.slice(weather.length - this.weatherCount);
        }
        this.render();
    }

    public render() {
        let result = '<div class="desktop">\n';
        this.news.forEach(news => (result += `[${news.time}] ${news.category} - ${news.title}\n`));
        this.weather.forEach(
            weather =>
                (result += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`)
        );
        result += '</div>';
        console.log(result);
    }
}
