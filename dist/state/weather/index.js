"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const observable_1 = require("../../utils/observable");
class WeatherState extends observable_1.Observable {
    constructor() {
        super(...arguments);
        this.measurements = [];
    }
    getMeasurements() {
        return this.measurements;
    }
    setMeasurements(measurements) {
        this.measurements.push(...measurements);
        this.notifyObservers();
    }
}
exports.WeatherState = WeatherState;
