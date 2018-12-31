import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class MobileView implements IObserver, IView {
    private news: IArticle[] = [];
    private weather: IMeasurement[] = [];
    private newsCount: number = 1;
    private weatherCount: number = 1;
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
        let result = '<div class="mobile">\n';
        const news = this.news[0];
        result += news !== undefined ? `[${news.time}] ${news.category} - ${news.title}\n` : '';

        const weather = this.weather[0];
        result +=
            weather !== undefined
                ? `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                      weather.humidity
                  } U\n`
                : '';

        console.log(result + '</div>');
    }
}
