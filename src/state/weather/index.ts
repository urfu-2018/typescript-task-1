import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private lastMeasurments: IMeasurement[] = [];

    public getMeasurements(): IMeasurement[] {
        return this.lastMeasurments;
    }

    public setMeasurements(measurements: IMeasurement[]): void {
        this.lastMeasurments = measurements;
        this.notifyObservers();
    }
}
