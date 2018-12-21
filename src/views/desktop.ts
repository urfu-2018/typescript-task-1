import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
    private states: {
        news: IArticle[];
        weather: IMeasurement[];
    } = {
        news: [],
        weather: []
    };

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            // typeof
            const newArticles = (observable as NewsState).getArticles();
            this.states.news = newArticles;
        } else if (observable instanceof WeatherState) {
            const newMeasurements = (observable as WeatherState).getMeasurements();
            this.states.weather = newMeasurements;
        } else {
            throw new Error('Not implemented');
        }
        this.render();
    }

    public render() {
        let content = `<div class="desktop">\n`;
        const newsCount = Math.min(3, this.states.news.length);
        const renderNews = this.states.news.splice(this.states.news.length - newsCount);
        renderNews.forEach(
            news => (content += `[${news.time}] ${news.category} - ${news.title}\n`)
        );

        const weatherCount = Math.min(2, this.states.weather.length);
        const renderWeather = this.states.weather.splice(this.states.weather.length - weatherCount);
        renderWeather.forEach(
            weather =>
                (content += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`)
        );
        content += `</div>`;

        console.log(content);
    }
}
