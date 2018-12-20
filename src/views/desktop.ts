import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { formatArticle } from '../utils/formatters/news';
import { formatMeasurement } from '../utils/formatters/weather';

export class DesktopView implements IObserver, IView {
    private static NEWS_COUNT = 3;
    private static WEATHER_COUNT = 2;

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
            .slice(Math.max(0, this.news.length - DesktopView.NEWS_COUNT))
            .map(formatArticle)
            .concat(
                this.weather
                    .slice(Math.max(0, this.weather.length - DesktopView.WEATHER_COUNT))
                    .map(formatMeasurement)
            )
            .join('\n');

        console.log(`<div class="desktop">\n${content}\n</div>`);
    }
}
