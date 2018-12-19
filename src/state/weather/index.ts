import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private measurement: IMeasurement[] = [];

    public getMeasurements() {
        return this.measurement;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.measurement = measurements;
        this.notifyObservers();
    }
}
