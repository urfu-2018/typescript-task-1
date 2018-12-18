import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class View implements IObserver, IView {
    private lastArticles: IArticle[];
    private lastMeasurements: IMeasurement[];
    private oldMessage: string;
    private readonly articlesCount: number;
    private readonly measurementsCount: number;
    private readonly tagName: string;

    constructor(tagName: string, articlesCount: number, measurementsCount: number) {
        this.tagName = tagName;
        this.articlesCount = articlesCount;
        this.measurementsCount = measurementsCount;
        this.oldMessage = '';
        this.lastArticles = [];
        this.lastMeasurements = [];
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.lastArticles = (observable as NewsState).getArticles().splice(-this.articlesCount);
        }
        if (observable instanceof WeatherState) {
            this.lastMeasurements = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.measurementsCount);
        }
        this.render();
    }

    public render(): void {
        const articlesStr = this.lastArticles.reduce(
            (x, y) => x + `[${y.time}] ${y.category} - ${y.title}\n`,
            ''
        );
        const measurementStr = this.lastMeasurements.reduce(
            (x, y) => x + `[${y.time}] ${y.temperature} C, ${y.pressure} P, ${y.humidity} U\n`,
            ''
        );
        const currentMessage = `<div class="${
            this.tagName
        }">\n${articlesStr}${measurementStr}</div>`;
        if (currentMessage !== this.oldMessage) {
            this.oldMessage = currentMessage;
            console.log(currentMessage);
        }
    }
}
