import { IObservable } from '../utils/observable/types';
import { IObserver } from '../utils/observable/types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export interface IView {
    render(): void;
}

export abstract class GeneralView implements IView, IObserver {
    protected articles: IArticle[] = [];
    protected measurements: IMeasurement[] = [];
    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = this.articles.concat(observable.getArticles());
        } else if (observable instanceof WeatherState) {
            this.measurements = this.measurements.concat(observable.getMeasurements());
        }

        this.render();
    }

    public abstract render(): void;

    protected prepareContent(articleCount: number, measurementCount: number) {
        this.articles = this.articles.slice(this.articles.length - articleCount);
        this.measurements = this.measurements.slice(this.measurements.length - measurementCount);
    }

    protected getContent(deviceClass: string): string {
        let content = `<div class="${deviceClass}">\n`;

        content = this.articles.reduce((acc: string, currentValue: IArticle): string => {
            return (
                acc + `[${currentValue.time}] ${currentValue.category} - ${currentValue.title}\n`
            );
        }, content);

        content = this.measurements.reduce((acc: string, currentValue: IMeasurement): string => {
            return (
                acc +
                `[${currentValue.time}] ${currentValue.temperature} C, ${
                    currentValue.pressure
                } P, ${currentValue.humidity} U\n`
            );
        }, content);

        return content + '</div>';
    }
}
