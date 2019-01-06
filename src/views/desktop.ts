import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    public currentWeather: IMeasurement[] = [];
    public currentNews: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.currentWeather = observable.getMeasurements().slice(-2);
        } else if (observable instanceof NewsState) {
            this.currentNews = observable.getArticles().slice(-3);
        }
        this.render();
    }

    public render() {
        const startOfLog = '<div class="desktop">\n';
        const endOfLog = '</div>';
        let contentOfLog = '';
        this.currentNews.forEach(article => {
            contentOfLog += `[${article.time}] ${article.category} - ${article.title}\n`;
        });
        this.currentWeather.forEach(measurement => {
            const { time, temperature, pressure, humidity } = measurement;
            contentOfLog += `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
        });
        console.log(startOfLog + contentOfLog + endOfLog);
    }
}
