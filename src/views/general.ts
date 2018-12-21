import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news/index';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather/index';

export abstract class GeneralCode implements IObserver, IView {
    protected abstract lastNewsCount: number;
    protected abstract latestWeatherCount: number;
    protected abstract typeDevice: string;
    private news: IArticle[] = [];
    private weather: IMeasurement[] = [];
    private previousPage: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const getNews = observable.getArticles();
            this.news = getNews.slice(getNews.length - this.lastNewsCount);
        } else if (observable instanceof WeatherState) {
            const getWeather = observable.getMeasurements();
            this.weather = getWeather.slice(getWeather.length - this.latestWeatherCount);
        } else {
            throw TypeError();
        }
        this.render();
    }

    public render() {
        const listNews = this.news.map(el => this.renderNews(el));
        const listWeather = this.weather.map(el => this.renderWeather(el));
        const result = listNews.concat(listWeather).join('\n');
        const page = `<div class="${this.typeDevice}">\n${result}\n</div>`;
        if (this.previousPage !== page) {
            console.log(page);
            this.previousPage = page;
        }
    }

    private renderNews(element: IArticle) {
        return `[${element.time}] ${element.category} - ${element.title}`;
    }

    private renderWeather(el: IMeasurement) {
        return `[${el.time}] ${el.temperature} C, ${el.pressure} P, ${el.humidity} U`;
    }
}
