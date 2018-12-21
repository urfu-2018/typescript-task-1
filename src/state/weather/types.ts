import { AbstractState } from '../types';

export interface IMeasurement {
    time: string; // e.g. '12:00'
    pressure: number; // e.g. 767.2
    humidity: number; // e.g. 44
    temperature: number; // e.g. -14.9
}

export interface IWeatherState {
    getMeasurements(): IMeasurement[];

    setMeasurements(measurements: IMeasurement[]): void;
}

export function isIWeatherState(obj: AbstractState): obj is IWeatherState {
    obj = obj as IWeatherState;
    return obj.getMeasurements !== undefined && obj.setMeasurements !== undefined;
}
