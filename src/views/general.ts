import { IView } from './types';
import { IObservable, IObserver } from '../utils/observable/types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';

export class ViewObserver implements IView, IObserver {
    private newsLines: string[] = [];
    private weatherLines: string[] = [];

    private readonly newsToShowAmount: number;
    private readonly weatherMeasurmentsToShowAmount: number;
    private readonly outputDivClass: string;

    protected constructor(
        newsToShowAmount: number,
        weatherMeasurmentsToShowAmount: number,
        outputDivClass: string
    ) {
        this.newsToShowAmount = newsToShowAmount;
        this.weatherMeasurmentsToShowAmount = weatherMeasurmentsToShowAmount;
        this.outputDivClass = outputDivClass;
    }

    public render(): void {
        this.renderLines(this.newsToShowAmount, this.weatherMeasurmentsToShowAmount);
    }

    public renderLines(newsLinesAmount: number, weatherLinesAmount: number): void {
        const linesToRender: string[] = this.getLastNewsLines(newsLinesAmount).concat(
            this.getLastWeatherLines(weatherLinesAmount)
        );

        console.log(`<div class="${this.outputDivClass}">\n${linesToRender.join('\n')}\n</div>`);
    }

    public update(observable: IObservable): void {
        let shouldRender = true;
        if (observable instanceof WeatherState) {
            const prevLines = this.getLastWeatherLines(this.weatherMeasurmentsToShowAmount);
            this.updateWeatherLines(observable.getMeasurements());
            const newLines = this.getLastWeatherLines(this.weatherMeasurmentsToShowAmount);
            shouldRender = !arraysEquals(prevLines, newLines);
        } else if (observable instanceof NewsState) {
            const prevLines = this.getLastNewsLines(this.newsToShowAmount);
            this.updateNewsLines(observable.getArticles());
            const newLines = this.getLastNewsLines(this.newsToShowAmount);
            shouldRender = !arraysEquals(prevLines, newLines);
        }

        if (shouldRender) {
            this.render();
        }
    }

    private getLastNewsLines(amount: number): string[] {
        return this.newsLines.slice(this.newsLines.length - amount, this.newsLines.length);
    }

    private getLastWeatherLines(amount: number): string[] {
        return this.weatherLines.slice(this.weatherLines.length - amount, this.weatherLines.length);
    }

    private updateWeatherLines(measurements: IMeasurement[]): void {
        this.weatherLines = measurements.map(
            m => `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`
        );
    }

    private updateNewsLines(articles: IArticle[]): void {
        this.newsLines = articles.map(a => `[${a.time}] ${a.category} - ${a.title}`);
    }
}

function arraysEquals(arr1: string[], arr2: string[]): boolean {
    return arr1.length === arr2.length && arr1.every((_, i) => arr1[i] === arr2[i]);
}
