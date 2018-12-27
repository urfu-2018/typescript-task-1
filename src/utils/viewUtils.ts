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
    private markUp = '';
    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    public update(observable: IObservable) {
        let articles: IArticle[] = [];
        let measurements: IMeasurement[] = [];

        if (observable instanceof NewsState) {
            const count = this.getArticlesCount();
            articles = getLastNElements(observable.getArticles(), count);
        } else if (observable instanceof WeatherState) {
            const count = this.getMeasurementsCount();
            measurements = getLastNElements(observable.getMeasurements(), count);
        } else {
            return;
        }

        this.effectiveRender(articles, measurements);
    }

    public effectiveRender(articles: IArticle[], measurements: IMeasurement[]): void {
        if (
            !isEqual(articles, this.lastArticles) ||
            !isEqual(measurements, this.lastMeasurements)
        ) {
            this.markUp = prepareView(this.getHtmlClass(), articles, measurements);

            this.render();

            this.lastArticles = articles;
            this.lastMeasurements = measurements;
        }
    }

    public render(): void {
        console.log(this.markUp);
    }

    protected abstract getHtmlClass(): string;
    protected abstract getArticlesCount(): number;
    protected abstract getMeasurementsCount(): number;
}
