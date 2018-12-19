import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private articleToRender: string = '';
    private weatherToRender: string = '';

    private lastResult: string = '';

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            this.articleToRender = this.formatArticles(articles[articles.length - 1]);
        }
        if (observable instanceof WeatherState) {
            const measurments = observable.getMeasurements();
            this.weatherToRender = this.formatWeather(measurments[measurments.length - 1]);
        }

        const result = [
            `<div class="mobile">`,
            this.articleToRender,
            this.weatherToRender,
            `</div>`
        ]
            .filter(x => x !== ``)
            .join(`\n`);

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
