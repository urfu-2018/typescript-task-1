import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { Render } from '../render/index';

function getInformation(observable: IObservable) {
    let articles: IArticle[] = [];
    let measurements: IMeasurement[] = [];

    if (observable instanceof NewsState) {
        articles = observable.getArticles();
    } else if (observable instanceof WeatherState) {
        measurements = observable.getMeasurements();
    } else {
        throw new TypeError();
    }

    return { articles, measurements };
}

export function createResultView(
    observable: IObservable,
    articleCount: number,
    weatherCount: number,
    htmlClass: string
): string {
    const { articles, measurements } = getInformation(observable);
    const resultArticles = articles.slice(articles.length - articleCount);
    const resultMeasurements = measurements.slice(measurements.length - weatherCount);

    return Render.createView(resultArticles, resultMeasurements, htmlClass);
}
