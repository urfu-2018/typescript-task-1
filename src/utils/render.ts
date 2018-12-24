import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export class Render {
    public static getRenderedArticle(a: IArticle): string {
        return `[${a.time}] ${a.category} - ${a.title}\n`;
    }

    public static getRenderedMeasurement(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U\n`;
    }
}
