import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private weather: IMeasurement[] = [];

    public getMeasurements() {
        return this.weather;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.weather = measurements;
        this.notifyObservers();
    }
}
