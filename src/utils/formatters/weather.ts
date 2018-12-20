import { IMeasurement } from '../../state/weather/types';

export function formatMeasurement(measurement: IMeasurement) {
    return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
        measurement.humidity
    } U`;
}
