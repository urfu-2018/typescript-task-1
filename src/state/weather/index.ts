import { IMeasurement, IWeatherState } from './types';
import { Observable } from '../../utils/observable';
import { IEquals } from '../../utils/types';

export class WeatherState extends Observable implements IWeatherState, IEquals<WeatherState> {
    private measurements: IMeasurement[] = [];

    public getMeasurements() {
        return this.measurements;
    }

    public setMeasurements(measurements: IMeasurement[]) {
        this.measurements = measurements;
        this.notifyObservers();
    }

    public equals(obj: WeatherState | undefined): boolean {
        if (obj === undefined) {
            return false;
        }
        const firstMeasurments = this.measurements;
        const secondsMeasurments = obj.measurements;
        if (firstMeasurments.length !== secondsMeasurments.length) {
            return false;
        }
        for (let i = 0; i < firstMeasurments.length; i++) {
            const firstMeasurment = this.measurements[i];
            const secondsMeasurment = obj.measurements[i];
            if (
                firstMeasurment.humidity !== secondsMeasurment.humidity ||
                firstMeasurment.pressure !== secondsMeasurment.pressure ||
                firstMeasurment.temperature !== secondsMeasurment.temperature ||
                firstMeasurment.time !== secondsMeasurment.time
            ) {
                return false;
            }
        }
        return true;
    }
}
