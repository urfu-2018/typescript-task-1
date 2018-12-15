import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private measurements: IMeasurement[] = [];

    public getMeasurements(): IMeasurement[] {
        return JSON.parse(JSON.stringify(this.measurements)); // Deep copy
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.measurements = measurements;

        this.notifyObservers();
    }
}
