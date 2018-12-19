import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export abstract class View implements IObserver, IView {
    protected abstract measurementsCount: number;
    protected abstract articlesCount: number;
    protected abstract deviceType: string;

    private content: string = '';

    public update(observable: IObservable) {
        let newContent = '';
        if (observable instanceof WeatherState) {
            newContent = this.getWeatherContent(observable);
        } else if (observable instanceof NewsState) {
            newContent = this.getNewsContent(observable);
        }

        if (newContent !== this.content) {
            this.content = newContent;
            this.render();
        }
    }

    public render() {
        console.log(`<div class="${this.deviceType}">\n${this.content}\n</div>`);
    }

    private getNewsContent(newsState: NewsState): string {
        return newsState
            .getArticles()
            .slice(-this.articlesCount)
            .map(article => `[${article.time}] ${article.category} - ${article.title}`)
            .join('\n');
    }

    private getWeatherContent(weatherState: WeatherState): string {
        return weatherState
            .getMeasurements()
            .slice(-this.measurementsCount)
            .map(
                measurement =>
                    `[${measurement.time}] ${measurement.temperature} C,` +
                    ` ${measurement.pressure} P, ${measurement.humidity} U`
            )
            .join('\n');
    }
}
