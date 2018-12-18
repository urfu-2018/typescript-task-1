import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private lastArticle: string;
    private lastMeasurement: string;

    constructor() {
        this.lastArticle = '';
        this.lastMeasurement = '';
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = (observable as NewsState).getArticles().splice(-1);
            this.lastArticle = articles.reduce(
                (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
                ''
            );
        }
        if (observable instanceof WeatherState) {
            const measurements = (observable as WeatherState).getMeasurements().slice(-1);
            this.lastMeasurement = measurements.reduce(
                (x, y) => x + `[${y.time}] ${y.temperature} C, ${y.pressure} P, ${y.humidity} U\n`,
                ''
            );
        }
        this.render();
    }

    public render() {
        console.log('<div class="mobile">\n' + this.lastArticle + this.lastMeasurement + '</div>');
    }
}
