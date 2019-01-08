export interface IMeasurement {
    time: string; // e.g. '12:00'
    pressure: number; // e.g. 767.2
    humidity: number; // e.g. 44
    temperature: number; // e.g. -14.9
}

export function measurementToString({ time, pressure, humidity, temperature }: IMeasurement) {
    return `[${time}] ${temperature} C, ` + `${pressure} P, ${humidity} U`;
}

export interface IWeatherState {
    getMeasurements(): IMeasurement[];
    setMeasurements(measurements: IMeasurement[]): void;
}
