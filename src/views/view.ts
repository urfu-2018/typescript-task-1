import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export enum ViewType {
    Desktop = 'desktop',
    Mobile = 'mobile'
}

export abstract class View implements IObserver, IView {
    protected weather: WeatherState | undefined;
    private news: NewsState | undefined;
    private rendition: string | undefined;

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            if (observable.equals(this.weather)) {
                return;
            }
            this.weather = observable;
        } else if (observable instanceof NewsState) {
            if (observable.equals(this.news)) {
                return;
            }
            this.news = observable;
        } else {
            throw new TypeError();
        }
        this.render();
    }

    public render() {
        const rendition = `<div class="${this.getViewType()}">\n${this.newsToStr()}${this.weatherToStr()}</div>`;

        if (rendition !== this.rendition) {
            console.log(rendition);
            this.rendition = rendition;
        }
    }
    protected abstract getCountNews(): number;
    protected abstract getCountMeasurements(): number;
    protected abstract getViewType(): ViewType;

    private weatherToStr(): string {
        if (this.weather === undefined) {
            return '';
        }
        return this.weather
            .getMeasurements()
            .slice(-this.getCountMeasurements())
            .map(
                weather =>
                    `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                        weather.humidity
                    } U\n`
            )
            .join('');
    }

    private newsToStr(): string {
        if (this.news === undefined) {
            return '';
        }
        return this.news
            .getArticles()
            .slice(-this.getCountNews())
            .map(nextNew => `[${nextNew.time}] ${nextNew.category} - ${nextNew.title}\n`)
            .join('');
    }
}
