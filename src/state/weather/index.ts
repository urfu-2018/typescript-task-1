import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private newsWeathers: IMeasurement[] = [];

    public getMeasurements() {
        return this.newsWeathers;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.newsWeathers = measurements;
        this.notifyObservers();
    }
}
