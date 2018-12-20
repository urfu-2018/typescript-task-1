import { IObservable } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class RenderDataProvider {
    public static provide(
        observable: IObservable,
        articlesCount: number,
        weatherCount: number
    ): string {
        let result: string = '';
        if (observable instanceof NewsState) {
            const articles: IArticle[] = observable.getArticles().slice(-articlesCount);
            articles.forEach(value => {
                result += `[${value.time}] ${value.category} - ${value.title}\n`;
            });
        }
        if (observable instanceof WeatherState) {
            const measurements: IMeasurement[] = observable.getMeasurements().slice(-weatherCount);
            measurements.forEach(value => {
                result += `[${value.time}] ${value.temperature} C, ${value.pressure} P, ${
                    value.humidity
                } U\n`;
            });
        }
        return result;
    }
}

export abstract class RenderDataContainer {
    get renderData(): string {
        return this._renderData;
    }

    set renderData(value: string) {
        this._renderData = value;
    }

    private _renderData: string = '';
}
