import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { IView } from '../views/types';
import { IObservable } from './observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { isEqual } from './objectUtils';
import { ViewElements } from '../state/types';

function prepareViewToRender(htmlClass: string, articles: string, measurements: string): string {
    return `<div class="${htmlClass}">\n${articles}${measurements}</div>`;
}

function getLastNElements<T>(array: T[], size: number): T[] {
    return array.slice(-size);
}

function prepareViewElements(viewElements: ViewElements[]): string {
    if (viewElements.length === 0) {
        return '';
    }

    if (instanceOfArticle(viewElements)) {
        return viewElements.reduce((prevValue, { time, category, title }) => {
            return prevValue + `[${time}] ${category} - ${title}\n`;
        }, '');
    } else if (instanceOfMeasurement(viewElements)) {
        return viewElements.reduce((prevValue, { time, pressure, humidity, temperature }) => {
            return prevValue + `[${time}] ${temperature} C, ${pressure} P, ${humidity} U\n`;
        }, '');
    } else {
        throw TypeError('Unknown type');
    }
}

function instanceOfArticle(object: any): object is IArticle[] {
    return (object as IArticle[])[0].category !== undefined;
}

function instanceOfMeasurement(object: any): object is IMeasurement[] {
    return (object as IMeasurement[])[0].temperature !== undefined;
}

export abstract class EffectiveLogView implements IView {
    private currentArticles: IArticle[] = [];
    private currentMeasurements: IMeasurement[] = [];

    private lastMeasurements: IMeasurement[] = [];
    private lastArticles: IArticle[] = [];

    private measurementsView = '';
    private articlesView = '';

    private changed = false;

    public update(observable: IObservable): void {
        if (observable instanceof NewsState) {
            const size = this.getArticlesSize();
            this.currentArticles = getLastNElements(observable.getArticles(), size);
        } else if (observable instanceof WeatherState) {
            const size = this.getMeasurementsSize();
            this.currentMeasurements = getLastNElements(observable.getMeasurements(), size);
        } else {
            return;
        }

        this.render();
    }

    public render(): void {
        if (!isEqual(this.currentArticles, this.lastArticles)) {
            this.articlesView = prepareViewElements(this.currentArticles);
            this.lastArticles = this.currentArticles;

            this.changed = true;
        }

        if (!isEqual(this.currentMeasurements, this.lastMeasurements)) {
            this.measurementsView = prepareViewElements(this.currentMeasurements);
            this.lastMeasurements = this.currentMeasurements;

            this.changed = true;
        }

        if (this.changed) {
            const markUp = prepareViewToRender(
                this.getHtmlClass(),
                this.articlesView,
                this.measurementsView
            );

            console.log(markUp);
            this.changed = false;
        }
    }

    protected abstract getHtmlClass(): string;
    protected abstract getArticlesSize(): number;
    protected abstract getMeasurementsSize(): number;
}
