import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
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
        let articles: string = '';
        let weatherMeasurements: string = '';
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                articles = this.getNewsContent(date);
            }
            if (date instanceof WeatherState) {
                weatherMeasurements = this.getWeatherContent(date);
            }
        });
        return `<div class="desktop">\n${articles}${weatherMeasurements}<\div>`;
    }

    private getNewsContent(news: NewsState) {
        const articles: string[] = [];
        news.getArticles()
            .slice(-3)
            .forEach(article => {
                articles[articles.length] = `[${article.time}] ${article.category} - ${
                    article.title
                }\n`;
            });
        return articles.join('');
    }

    private getWeatherContent(weatherState: WeatherState) {
        const measurements: string[] = [];
        weatherState
            .getMeasurements()
            .slice(-2)
            .forEach(weather => {
                measurements[measurements.length] = `[${weather.time}] ${weather.temperature} C, ${
                    weather.pressure
                } P, ${weather.humidity} U\n`;
            });
        return measurements.join('');
    }
}
