import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private _measurements: IMeasurement[] = [];

    public getMeasurements() {
        return this._measurements;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this._measurements = measurements;
        this.notifyObservers();
    }
}
