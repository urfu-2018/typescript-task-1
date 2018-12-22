import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private weather: IMeasurement[] = [];

    public getMeasurements(): IMeasurement[] {
        return this.weather;
    }

    public setMeasurements(measurements: IMeasurement[]): void {
        this.weather = measurements;
        this.notifyObservers();
    }
}
