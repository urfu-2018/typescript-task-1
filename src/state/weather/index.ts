import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    constructor(private measurements: IMeasurement[] = []) {
        super();
    }

    public getMeasurements() {
        return this.measurements;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.measurements = measurements;
        this.notifyObservers();
    }
}
