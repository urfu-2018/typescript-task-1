import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { equal } from 'assert';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            // const pastArticles = this.articles;
            this.articles = observable.getArticles().slice(-3);
            this.render();
        }
        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-2);
            this.render();
        }
    }

    public render() {
        const newContent = [
            ...this.measurements.map(measurement => `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${measurement.humidity} U`), 
            ...this.articles.map(article => `[${article.time}] ${article.category} - ${article.title}`)
        ];
        console.log(`<div class="mobile">\n${newContent.join('\n')}\n</div>`);
    }
}
