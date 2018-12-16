import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function getInfo(observable: IObservable, articleCount: number, weatherCount: number) {
    let articles: IArticle[] = [];
    let measurements: IMeasurement[] = [];
    if (observable instanceof NewsState) {
        const rawArticles = observable.getArticles();
        articles = rawArticles.slice(rawArticles.length - articleCount);
    } else if (observable instanceof WeatherState) {
        const rawMeasurements = observable.getMeasurements();
        measurements = rawMeasurements.slice(rawMeasurements.length - weatherCount);
    } else {
        throw new TypeError();
    }

    return { articles, measurements };
}
