import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';

export class View implements IObserver, IView {
    private lastArticles: string;
    private lastMeasurements: string;
    private oldMessage: string;
    private readonly articlesCount: number;
    private readonly measurementsCount: number;
    private readonly tagName: string;

    constructor(tagName: string, articlesCount: number, measurementsCount: number) {
        this.tagName = tagName;
        this.articlesCount = articlesCount;
        this.measurementsCount = measurementsCount;
        this.oldMessage = '';
        this.lastArticles = '';
        this.lastMeasurements = '';
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const articles = (observable as NewsState).getArticles().splice(-this.articlesCount);
            this.lastArticles = articles.reduce(
                (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
                ''
            );
        }
        if (observable instanceof WeatherState) {
            const measurements = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.measurementsCount);
            this.lastMeasurements = measurements.reduce(
                (x, y) => x + `[${y.time}] ${y.temperature} C, ${y.pressure} P, ${y.humidity} U\n`,
                ''
            );
        }
        this.render();
    }

    public render(): void {
        const currentMessage = `<div class="${this.tagName}">\n${this.lastArticles}${
            this.lastMeasurements
        }</div>`;
        if (currentMessage !== this.oldMessage) {
            this.oldMessage = currentMessage;
            console.log(this.oldMessage);
        }
    }
}
