import { ViewObserver } from './general';
import {
    NewsLinesExtractor,
    WeatherMeasurementLinesExtractor
} from '../utils/extractors/lines-extractor';

export class DesktopView extends ViewObserver {
    constructor() {
        super('desktop', new NewsLinesExtractor(3), new WeatherMeasurementLinesExtractor(2));
    }
}
