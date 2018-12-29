import { ViewObserver } from './general';
import { NewsLinesExtractor, WeatherMeasurementLinesExtractor } from '../utils/lines-extractor';

export class MobileView extends ViewObserver {
    constructor() {
        super('mobile', new NewsLinesExtractor(1), new WeatherMeasurementLinesExtractor(1));
    }
}
