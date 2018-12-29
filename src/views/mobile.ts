import { ViewObserver } from './general';
import {
    NewsLinesExtractor,
    WeatherMeasurementLinesExtractor
} from '../utils/extractors/lines-extractor';

export class MobileView extends ViewObserver {
    constructor() {
        super('desktop', new NewsLinesExtractor(1), new WeatherMeasurementLinesExtractor(1));
    }
}
