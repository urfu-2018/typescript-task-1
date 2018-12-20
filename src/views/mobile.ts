import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { formatArticle } from '../utils/formatters/news';
import { formatMeasurement } from '../utils/formatters/weather';

export class MobileView implements IObserver, IView {
    private static NEWS_COUNT = 1;
    private static WEATHER_COUNT = 1;

    private news: IArticle[] = [];
    private weather: IMeasurement[] = [];

    public update(observable: IObservable) {
        let needRender = false;

        if (observable instanceof NewsState) {
            const articles = observable.getArticles();
            if (articles !== this.news) {
                this.news = observable.getArticles();
                needRender = true;
            }
        }

        if (observable instanceof WeatherState) {
            const measurements = observable.getMeasurements();
            if (measurements !== this.weather) {
                this.weather = observable.getMeasurements();
                needRender = true;
            }
        }

        if (needRender) {
            this.render();
        }
    }

    public render() {
        const content = this.news
            .slice(this.news.length - MobileView.NEWS_COUNT)
            .map(formatArticle)
            .concat(
                this.weather
                    .slice(this.weather.length - MobileView.WEATHER_COUNT)
                    .map(formatMeasurement)
            )
            .join('\n');

        console.log(`<div class="mobile">\n${content}\n</div>`);
    }
}
