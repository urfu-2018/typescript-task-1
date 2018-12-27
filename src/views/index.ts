import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news/index';
import { WeatherState } from '../state/weather/index';

export abstract class View implements IObserver, IView {
    protected abstract nameClass: string;
    protected abstract recordNumberNews: number;
    protected abstract recordNumberWeather: number;

    private recordsNews: IArticle[] = [];
    private recordsWeather: IMeasurement[] = [];
    private content: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const news = observable.getArticles();
            this.recordsNews = news.slice(-this.recordNumberNews);
        } else if (observable instanceof WeatherState) {
            const weather = observable.getMeasurements();
            this.recordsWeather = weather.slice(-this.recordNumberWeather);
        } else {
            throw TypeError('Объект для обновления не принадлежит классу NewsState и WeatherState');
        }

        this.render();
    }

    public render() {
        const listStringNews = this.recordsNews.map(
            element => `[${element.time}] ${element.category} - ${element.title}`
        );

        const listStringWeather = this.recordsWeather.map(
            value =>
                `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${value.humidity} U`
        );

        const content = listStringNews.concat(listStringWeather).join('\n');

        if (this.content === content) {
            return;
        }

        this.content = content;

        const divBlock = `<div class="${this.nameClass}">\n${content}\n</div>`;

        console.log(divBlock);
    }
}
