import { IObservable } from '../utils/observable/types';
import { INewsState } from './news/types';
import { IWeatherState } from './weather/types';

export type AbstractState = IObservable | IWeatherState | INewsState;
