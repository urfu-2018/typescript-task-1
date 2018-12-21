import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class MobileView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-1);
            this.render();
        }
        else if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-1);
            this.render();
        }
    }

    public render() {
        const newContent = [
            ...this.measurements.map(measurement => 
                `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${measurement.humidity} U`
            ), 
            ...this.articles.map(article => `[${article.time}] ${article.category} - ${article.title}`
            )
        ];
        console.log(`<div class="mobile">\n${newContent.join('\n')}\n</div>`);
    }
}
