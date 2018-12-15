export interface IMeasurement {
    time: string; // e.g. '12:00'
    pressure: number; // e.g. 767.2
    humidity: number; // e.g. 44
    temperature: number; // e.g. -14.9
}

export function measurementToString(measurement: IMeasurement) {
    return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
        measurement.humidity
    } U`;
}

export interface IWeatherState {
    getMeasurements(): IMeasurement[];
    setMeasurements(measurements: IMeasurement[]): void;
}
