import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { IView } from '../views/types';
import { IObservable } from './observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { isEqual } from './objectUtils';

function prepareView(
    htmlClass: string,
    articles: IArticle[],
    measurements: IMeasurement[]
): string {
    let result = '';

    result = articles.reduce((prevValue, article) => {
        const { time, category, title } = article;
        return prevValue + `[${time}] ${category} - ${title}\n`;
    }, result);

    result = measurements.reduce((prevValue, measurement) => {
        const { time, pressure, humidity, temperature } = measurement;
        return prevValue + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
    }, result);

    return `<div class="${htmlClass}">\n${result}</div>`;
}

function getLastNElements<T>(array: T[], count: number): T[] {
    return array.slice(Math.max(array.length - count, 0));
}

export abstract class EffectiveLogView implements IView {
    private currentArticles: IArticle[] = [];
    private currentMeasurements: IMeasurement[] = [];

    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const count = this.getArticlesCount();
            this.currentArticles = getLastNElements(observable.getArticles(), count);
        } else if (observable instanceof WeatherState) {
            const count = this.getMeasurementsCount();
            this.currentMeasurements = getLastNElements(observable.getMeasurements(), count);
        } else {
            return;
        }

        this.render();
    }

    public render(): void {
        if (
            !isEqual(this.currentArticles, this.lastArticles) ||
            !isEqual(this.currentMeasurements, this.lastMeasurements)
        ) {
            const markUp = prepareView(
                this.getHtmlClass(),
                this.currentArticles,
                this.currentMeasurements
            );

            console.log(markUp);

            this.lastArticles = this.currentArticles;
            this.lastMeasurements = this.currentMeasurements;
        }
    }

    protected abstract getHtmlClass(): string;
    protected abstract getArticlesCount(): number;
    protected abstract getMeasurementsCount(): number;
}
