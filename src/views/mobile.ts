import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private dates: Set<IObservable> = new Set();
    private lastContent?: string;

    public update(observable: IObservable) {
        this.dates.add(observable);
        const currentContent = this.getContent();
        if (currentContent !== this.lastContent) {
            this.lastContent = currentContent;
            this.render();
        }
    }

    public render() {
        console.log(this.lastContent);
    }

    private getContent() {
        let article: string = '';
        let weatherMeasurement: string = '';
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                article = this.getNewsContent(date);
            }
            if (date instanceof WeatherState) {
                weatherMeasurement = this.getWeatherContent(date);
            }
        });
        return `<div class="mobile">\n${article}${weatherMeasurement}<\div>`;
    }

    private getNewsContent(news: NewsState) {
        let content: string = '';
        news.getArticles()
            .slice(-1)
            .forEach(article => {
                content = `[${article.time}] ${article.category} - ${article.title}\n`;
            });
        return content;
    }

    private getWeatherContent(weatherState: WeatherState) {
        let measurement: string = '';
        weatherState
            .getMeasurements()
            .slice(-1)
            .forEach(weather => {
                measurement = `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`;
            });
        return measurement;
    }
}
