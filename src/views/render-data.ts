import { IArticle, INewsState } from '../state/news/types';
import { IMeasurement, IWeatherState } from '../state/weather/types';

export class RenderDataProvider {
    public static provideArticles(observable: INewsState, articlesCount: number): string {
        let result: string = '';
        const articles: IArticle[] = observable.getArticles().slice(-articlesCount);
        articles.forEach(value => {
            result += `[${value.time}] ${value.category} - ${value.title}\n`;
        });
        return result;
    }

    public static provideMeasurements(observable: IWeatherState, weatherCount: number): string {
        let result: string = '';
        const measurements: IMeasurement[] = observable.getMeasurements().slice(-weatherCount);
        measurements.forEach(value => {
            result += `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${
                value.humidity
            } U\n`;
        });
        return result;
    }
}
