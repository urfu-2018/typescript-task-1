import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private weathers: IMeasurement[] = [];
    public getMeasurements() {
        return this.weathers;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.weathers = measurements;
        this.notifyObservers();
    }
}
