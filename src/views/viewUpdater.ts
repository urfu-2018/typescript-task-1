import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class ViewUpdater {
    private lastArticles: string;
    private lastMeasurements: string;
    private readonly articlesCount: number;
    private readonly measurementsCount: number;
    private readonly tagName: string;

    constructor(tagName: string, articlesCount: number, measurementsCount: number) {
        this.tagName = tagName;
        this.articlesCount = articlesCount;
        this.measurementsCount = measurementsCount;
        this.lastArticles = '';
        this.lastMeasurements = '';
    }

    public update(observable: IObservable): boolean {
        const oldArticles = this.lastArticles.slice(0);
        const oldMeasurements = this.lastMeasurements.slice(0);
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
        return oldArticles !== this.lastArticles || oldMeasurements !== this.lastMeasurements;
    }

    public getInfo(): string {
        return `<div class="${this.tagName}">\n${this.lastArticles}${this.lastMeasurements}</div>`;
    }
}
