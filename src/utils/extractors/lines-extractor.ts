import { IObservable } from '../observable/types';
import { NewsState } from '../../state/news';
import { WeatherState } from '../../state/weather';

export abstract class LinesExtractor {
    private lines: string[] = [];

    public constructor(private readonly linesAmount: number) {}

    public getLines(): string[] {
        return this.lines;
    }

    public extractLinesFrom(observable: IObservable): void {
        if (this.canExtractFrom(observable)) {
            const newLines = this.extractLinesSource(observable).slice();
            this.lines = newLines.slice(newLines.length - this.linesAmount, newLines.length);
        }
    }

    public abstract canExtractFrom(source: IObservable): boolean;

    protected abstract extractLinesSource(source: IObservable): string[];
}

export class NewsLinesExtractor extends LinesExtractor {
    public canExtractFrom(source: IObservable): boolean {
        return source instanceof NewsState;
    }

    protected extractLinesSource(source: IObservable): string[] {
        return (source as NewsState)
            .getArticles()
            .map(a => `[${a.time}] ${a.category} - ${a.title}`);
    }
}

export class WeatherMeasurementLinesExtractor extends LinesExtractor {
    public canExtractFrom(source: IObservable): boolean {
        return source instanceof WeatherState;
    }

    protected extractLinesSource(source: IObservable): string[] {
        return (source as WeatherState)
            .getMeasurements()
            .map(m => `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`);
    }
}
