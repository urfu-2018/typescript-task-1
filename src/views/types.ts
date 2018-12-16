import { IObservable } from '../utils/observable/types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export interface IView {
    render(): void;
}

export interface IUpdateableView {
    handleObservable(observable: IObservable): void;
    setArticles(articles: IArticle[]): void;
    setMeasurements(measurements: IMeasurement[]): void;
    hasNotRenderedEntries(): boolean;
    renderArticle(article: IArticle): string;
    renderMeasurement(measurement: IMeasurement): string;
}
