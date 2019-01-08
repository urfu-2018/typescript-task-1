import { IObservable, IObserver } from '../utils/observable/types';
import { WeatherState } from '../state/weather';
import { IView } from './types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news';

export class MobileView implements IObserver, IView {
    private measurements: IMeasurement[] = [];
    private articles: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-1);
        } else if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-1);
        } else {
            throw new TypeError('Unknown type of data');
        }

        this.render();
    }

    public render() {
        const formattedArticles = this.articles.map(
            article => `[${article.time}] ${article.category} - ${article.title}`
        );

        const formattedMeasurements = this.measurements.map(
            measurement =>
                `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
                    measurement.humidity
                } U`
        );
        const content = formattedArticles.concat(formattedMeasurements).join('\n');
        const markup = `<div class="mobile">\n${content}\n</div>`;
        console.log(markup);
    }
}
