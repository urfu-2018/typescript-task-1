import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private articlesCount: number = 3;
    private weatherCount: number = 2;

    private articlesToRender: string[] = [];
    private weatherToRender: string[] = [];

    private lastResult: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.articlesToRender = articles
                .slice(articles.length - this.articlesCount)
                .map(x => this.formatArticles(x));
        }
        if (observable instanceof WeatherState) {
            const measurments = observable.getMeasurements();
            this.weatherToRender = measurments
                .slice(measurments.length - this.weatherCount)
                .map(x => this.formatWeather(x));
        }

        let result: string = `<div class="desktop">\n`;
        this.articlesToRender
            .concat(this.weatherToRender)
            .forEach(x => (result = `${result}${x}\n`));
        result += '</div>';

        if (this.lastResult !== result) {
            this.lastResult = result;
            this.render();
        }
    }

    public render() {
        console.log(this.lastResult);
    }

    private formatArticles(article: IArticle) {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private formatWeather(measurment: IMeasurement) {
        return `[${measurment.time}] ${measurment.temperature} C, ${measurment.pressure} P, ${
            measurment.humidity
        } U`;
    }
}
