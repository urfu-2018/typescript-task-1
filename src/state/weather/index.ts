import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private _newsWeathers: IMeasurement[] = [];

    public getMeasurements() {
        return this._newsWeathers;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this._newsWeathers = measurements;
        this.notifyObservers();
    }
}
