import { INewsState } from '../state/news/types';
import { IWeatherState } from '../state/weather/types';

export class RenderDataProvider {
    public static provideArticles(observable: INewsState, articlesCount: number): string {
        return observable
            .getArticles()
            .slice(-articlesCount)
            .map(value => `[${value.time}] ${value.category} - ${value.title}\n`)
            .reduce((result, value) => result + value, '');
    }

    public static provideMeasurements(observable: IWeatherState, weatherCount: number): string {
        return observable
            .getMeasurements()
            .slice(-weatherCount)
            .map(
                value =>
                    `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${
                        value.humidity
                    } U\n`
            )
            .reduce((result, value) => result + value, '');
    }
}
