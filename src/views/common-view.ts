import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class CommonView {
    private readonly weatherCount: number;
    private readonly newsCount: number;

    private currentNews: IArticle[] = [];
    private currentWeather: IMeasurement[] = [];
    private newsToRender: IArticle[] = [];
    private weatherToRender: IMeasurement[] = [];

    protected constructor(newsCount: number, weatherCount: number) {
        this.weatherCount = weatherCount;
        this.newsCount = newsCount;
    }

    protected commonUpdate(observable: IObservable) {
        if (observable instanceof NewsState) {
            const all = observable.getArticles();
            this.newsToRender = all.slice(all.length - this.newsCount);
        } else if (observable instanceof WeatherState) {
            const all = observable.getMeasurements();
            this.weatherToRender = all.slice(all.length - this.weatherCount);
        } else {
            throw new Error('Wrong state: should be news or weather');
        }
    }

    protected preRender(): string {
        let result: string = '';
        this.newsToRender.forEach(n => (result += `[${n.time}] ${n.category} - ${n.title}\n`));
        this.weatherToRender.forEach(
            w => (result += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`)
        );

        this.tidyUp();
        return result;
    }

    protected isRenderNeeded(): boolean {
        return (
            !this.isShallowEqual(this.currentNews, this.newsToRender) ||
            !this.isShallowEqual(this.currentWeather, this.weatherToRender)
        );
    }

    private tidyUp() {
        this.currentNews.splice(0, this.currentNews.length, ...this.newsToRender);
        this.currentWeather.splice(0, this.currentWeather.length, ...this.weatherToRender);
    }

    private isShallowEqual(
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
}
