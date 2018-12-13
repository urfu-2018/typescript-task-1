import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    public getMeasurements() {
        return [];
    }

    public setMeasurements(measurements: IMeasurement[]) {
        throw new Error('Not implemented');
    }
}
