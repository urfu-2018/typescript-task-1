import { IObservable } from '../utils/observable/types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export interface IView {
    render(): void;
}

export interface IUpdateableView {
    handleObservable(observable: IObservable, newsCount: number, weatherCount: number): void;
    setArticles(articles: IArticle[]): void;
    setMeasurements(measurements: IMeasurement[]): void;
    shouldOutputEntries(): boolean;
    outputRendered(wrapperClass: string): void;
    renderArticle(article: IArticle): string;
    renderMeasurement(measurement: IMeasurement): string;
}
