import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export interface IView {
    currentWeather: IMeasurement[];
    currentNews: IArticle[];
    render(): void;
}
