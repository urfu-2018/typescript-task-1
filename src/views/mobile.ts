import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private lastArticles: string;
    private lastMeasurements: string;

    constructor() {
        this.lastArticles = '';
        this.lastMeasurements = '';
    }

    public update(observable: IObservable) {
        const oldArticles = this.lastArticles.slice(0);
        const oldMeasurements = this.lastMeasurements.slice(0);
        if (observable instanceof NewsState) {
            const articles = (observable as NewsState).getArticles().splice(-1);
            this.lastArticles = articles.reduce(
                (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
                ''
            );
        }
        if (observable instanceof WeatherState) {
            const measurements = (observable as WeatherState).getMeasurements().slice(-1);
            this.lastMeasurements = measurements.reduce(
                (x, y) => x + `[${y.time}] ${y.temperature} C, ${y.pressure} P, ${y.humidity} U\n`,
                ''
            );
        }
        if (oldArticles !== this.lastArticles || oldMeasurements !== this.lastMeasurements) {
            this.render();
        }
    }

    public render() {
        console.log(
            '<div class="mobile">\n' + this.lastArticles + this.lastMeasurements + '</div>'
        );
    }
}
