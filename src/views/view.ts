import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class View implements IObserver, IView {
    private static isArraysEqual<T>(firstArray: T[], secondArray: T[]): boolean {
        if (firstArray.length !== secondArray.length) {
            return false;
        }
        for (let i = 0; i < firstArray.length; i++) {
            if (!View.isItemsEqual(firstArray[i], secondArray[i])) {
                return false;
            }
        }
        return true;
    }

    private static isItemsEqual<T>(firstItem: T, secondItem: T): boolean {
        for (const key in firstItem) {
            if (firstItem[key] !== secondItem[key]) {
                return false;
            }
        }
        return true;
    }

    private lastArticles: IArticle[] = [];
    private lastMeasurements: IMeasurement[] = [];
    private readonly articlesLimit: number;
    private readonly measurementsLimit: number;
    private readonly viewType: string;

    constructor(settings: { viewType: string; articlesLimit: number; measurementsLimit: number }) {
        this.viewType = settings.viewType;
        this.articlesLimit = settings.articlesLimit;
        this.measurementsLimit = settings.measurementsLimit;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const oldArticles = [...this.lastArticles];
            this.lastArticles = observable.getArticles().slice(-this.articlesLimit);
            if (View.isArraysEqual(oldArticles, this.lastArticles)) {
                return;
            }
        } else if (observable instanceof WeatherState) {
            const oldMeasurements = [...this.lastMeasurements];
            this.lastMeasurements = observable.getMeasurements().slice(-this.measurementsLimit);
            if (View.isArraysEqual(oldMeasurements, this.lastMeasurements)) {
                return;
            }
        } else {
            throw new TypeError(`{typeof observable} doesn't supported as observable`);
        }
        this.render();
    }

    public render(): void {
        const currentMessage = this.getMessage();
        console.log(currentMessage);
    }

    private getMessage(): string {
        const articlesStr = this.lastArticles
            .map(article => `[${article.time}] ${article.category} - ${article.title}\n`)
            .join('');
        const measurementStr = this.lastMeasurements
            .map(
                measurement =>
                    `[${measurement.time}] ${measurement.temperature} C, ${
                        measurement.pressure
                    } P, ${measurement.humidity} U\n`
            )
            .join('');
        return `<div class="${this.viewType}">\n${articlesStr + measurementStr}</div>`;
    }
}
