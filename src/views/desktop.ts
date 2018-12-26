import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';

export class DesktopView implements IObserver, IView {
    private _recordNumberNews: number = 3;
    private _recordNumberWeather: number = 2;
    private _recordsNews: IArticle[] = [];
    private _recordsWeather: IMeasurement[] = [];
    private _content: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const news = observable.getArticles();
            this._recordsNews = news.slice(-this._recordNumberNews);
        } else if (observable instanceof WeatherState) {
            const weather = observable.getMeasurements();
            this._recordsWeather = weather.slice(-this._recordNumberWeather);
        } else {
            throw TypeError('Объект для обновления не принадлежит классу NewsState и WeatherState');
        }

        this.render();
    }

    public render() {
        const listStringNews = this._recordsNews.map(
            element => `[${element.time}] ${element.category} - ${element.title}`
        );

        const listStringWeather = this._recordsWeather.map(
            value =>
                `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${value.humidity} U`
        );

        const content = listStringNews.concat(listStringWeather).join('\n');

        if (this._content === content) {
            return;
        }

        this._content = content;

        const divBlock = `<div class="desktop">\n${content}\n</div>`;

        console.log(divBlock);
    }
}
