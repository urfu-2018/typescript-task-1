import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';

export class WeatherState extends Observable implements IWeatherState {
    private measurments: IMeasurement[] = []
    public getMeasurements() {
        return this.measurments;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.measurments = measurements;
        this.notifyObservers;
    }
}
