import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class View implements IObserver, IView {
    private static isNewsEqual(firstArticles: IArticle[], secondArticles: IArticle[]): boolean {
        if (firstArticles.length !== secondArticles.length) {
            return false;
        }
        for (let i = 0; i < firstArticles.length; i++) {
            if (!View.isArticlesEqual(firstArticles[i], secondArticles[i])) {
                return false;
            }
        }
        return true;
    }

    private static isArticlesEqual(firstArticle: IArticle, secondArticle: IArticle): boolean {
        return (
            firstArticle.time === secondArticle.time &&
            firstArticle.category === secondArticle.category &&
            firstArticle.title === secondArticle.title
        );
    }

    private static isWeatherEqual(
        firstMeasurements: IMeasurement[],
        secondMeasurements: IMeasurement[]
    ): boolean {
        if (firstMeasurements.length !== secondMeasurements.length) {
            return false;
        }
        for (let i = 0; i < firstMeasurements.length; i++) {
            if (!View.isMeasurementsEqual(firstMeasurements[i], secondMeasurements[i])) {
                return false;
            }
        }
        return true;
    }

    private static isMeasurementsEqual(
        firstMeasurement: IMeasurement,
        secondMeasurement: IMeasurement
    ): boolean {
        return (
            firstMeasurement.time === secondMeasurement.time &&
            firstMeasurement.pressure === secondMeasurement.pressure &&
            firstMeasurement.humidity === secondMeasurement.humidity &&
            firstMeasurement.temperature === secondMeasurement.temperature
        );
    }

    private lastArticles: IArticle[] = [];
    private lastMeasurements: IMeasurement[] = [];
    private isChanged: boolean = true;
    private readonly articlesCount: number;
    private readonly measurementsCount: number;
    private readonly tagName: string;

    constructor(settings: { viewType: string; articlesLimit: number; measurementsLimit: number }) {
        this.tagName = settings.viewType;
        this.articlesCount = settings.articlesLimit;
        this.measurementsCount = settings.measurementsLimit;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const oldArticles = [...this.lastArticles];
            this.lastArticles = observable.getArticles().slice(-this.articlesCount);
            this.isChanged = !View.isNewsEqual(oldArticles, this.lastArticles);
        } else if (observable instanceof WeatherState) {
            const oldMeasurements = [...this.lastMeasurements];
            this.lastMeasurements = observable.getMeasurements().slice(-this.measurementsCount);
            this.isChanged = !View.isWeatherEqual(oldMeasurements, this.lastMeasurements);
        } else {
            throw new TypeError(`{typeof observable} doesn't support as observable`);
        }
        this.render();
    }

    public render(): void {
        if (this.isChanged) {
            this.isChanged = false;
            const currentMessage = this.getMessage();
            console.log(currentMessage);
        }
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
        return `<div class="${this.tagName}">\n${articlesStr + measurementStr}</div>`;
    }
}
