import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';

export abstract class View implements IObserver, IView {
    protected abstract articlesCount: number;
    protected abstract measurementsCount: number;
    protected abstract tagName: string;
    private lastArticles: string = '';
    private lastMeasurements: string = '';
    private oldMessage: string = '';

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const articles = (observable as NewsState).getArticles().splice(-this.articlesCount);
            this.lastArticles = articles.reduce(
                (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
                ''
            );
        } else if (observable instanceof WeatherState) {
            const measurements = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.measurementsCount);
            this.lastMeasurements = measurements.reduce(
                (x, y) => x + `[${y.time}] ${y.temperature} C, ${y.pressure} P, ${y.humidity} U\n`,
                ''
            );
        } else {
            throw new TypeError();
        }
        this.render();
    }

    public render(): void {
        const currentMessage = `<div class="${this.tagName}">\n${this.lastArticles}${
            this.lastMeasurements
        }</div>`;
        if (this.oldMessage !== currentMessage) {
            this.oldMessage = currentMessage;
            console.log(currentMessage);
        }
    }
}
