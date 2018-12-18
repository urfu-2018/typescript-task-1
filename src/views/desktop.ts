import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
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
            const articles = (observable as NewsState).getArticles().slice(-3);
            this.lastArticles = articles.reduce(
                (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
                ''
            );
        }
        if (observable instanceof WeatherState) {
            const measurements = (observable as WeatherState).getMeasurements().slice(-2);
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
            '<div class="desktop">\n' + this.lastArticles + this.lastMeasurements + '</div>'
        );
    }
}
