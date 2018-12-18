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
            this.newsToRender = all.slice(all.length - DesktopView.newsCount);
        } else if (observable instanceof WeatherState) {
            const all = observable.getMeasurements();
            this.weatherToRender = all.slice(all.length - DesktopView.weatherCount);
        } else {
            throw new Error('Wrong state: should be news or weather');
        }

        if (
            !this.isShallowEqual(this.currentNews, this.newsToRender) ||
            !this.isShallowEqual(this.currentWeather, this.weatherToRender)
        ) {
            this.render();
        }
    }

    public isShallowEqual(
        arr1: IArticle[] | IMeasurement[],
        arr2: IArticle[] | IMeasurement[]
    ): boolean {
        if (arr1.length === arr2.length) {
            for (let i = 0; i < arr1.length; i++) {
                if (arr1[i] !== arr2[i]) {
                    return false;
                }
            }

            return true;
        }

        return false;
    }

    public render() {
        let result = '<div class="desktop">\n';
        this.newsToRender.forEach(n => (result += `[${n.time}] ${n.category} - ${n.title}\n`));
        this.weatherToRender.forEach(
            w => (result += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
        );
        result += '</div>';
        console.log(result);
        this.currentNews.splice(0, this.currentNews.length, ...this.newsToRender);
        this.currentWeather.splice(0, this.currentWeather.length, ...this.weatherToRender);
    }
}
