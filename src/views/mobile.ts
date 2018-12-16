import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private static newsCount = 1;
    private static weatherCount = 1;
    private currentNews = [];
    private currentWeather = [];
    private newsToRender: IArticle[] = [];
    private weatherToRender: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const all = observable.getArticles();
            this.newsToRender = all.slice(all.length - MobileView.newsCount, all.length);
        } else if (observable instanceof WeatherState) {
            const all = observable.getMeasurements();
            this.weatherToRender = all.slice(all.length - MobileView.weatherCount, all.length);
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
        let result = '<div class="mobile">\n';
        this.newsToRender.forEach(n => (result += `[${n.time}] ${n.category} - ${n.title}\n`));
        this.weatherToRender.forEach(
            w => (result += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
        );
        result += '</div>';
        console.log(result);
    }
}
