import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private static newsCount = 3;
    private static weatherCount = 2;
    private currentNews: IArticle[] = [];
    private currentWeather: IMeasurement[] = [];
    private newsToRender: IArticle[] = [];
    private weatherToRender: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const all = observable.getArticles();
            this.newsToRender = all.slice(all.length - DesktopView.newsCount, all.length);
        } else if (observable instanceof WeatherState) {
            const all = observable.getMeasurements();
            this.weatherToRender = all.slice(all.length - DesktopView.weatherCount, all.length);
        } else {
            throw new Error('Wrong state: should be news or weather');
        }

        if (
            this.currentNews !== this.newsToRender ||
            this.currentWeather !== this.weatherToRender
        ) {
            this.render();
        }
    }

    public render() {
        let result = '<div class="desktop">\n';
        this.newsToRender.forEach(n => (result += `[${n.time}] ${n.category} - ${n.title}\n`));
        this.weatherToRender.forEach(
            w => (result += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
        );
        result += '</div>';
        console.log(result);
        this.currentNews.splice(0, this.currentNews.length);
        this.currentWeather.splice(0, this.currentWeather.length);
        this.currentNews.push(...this.newsToRender);
        this.currentWeather.push(...this.weatherToRender);
    }
}
