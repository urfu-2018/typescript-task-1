// import { IObservable, IObserver } from '../utils/observable/types';
import { View } from './types';
// import { IArticle } from '../state/news/types';
// import { IMeasurement } from '../state/weather/types';
// import { NewsState } from '../state/news';
// import { WeatherState } from '../state/weather';

export class MobileView extends View {
    public render() {
        let message = `<div class="mobile">\n`;
        const newsCount = Math.min(1, this.states.news.length);
        const renderNews = this.states.news.splice(this.states.news.length - newsCount);
        renderNews.forEach(
            news => (message += `[${news.time}] ${news.category} - ${news.title}\n`)
        );

        const weatherCount = Math.min(1, this.states.weather.length);
        const renderWeather = this.states.weather.splice(this.states.weather.length - weatherCount);
        renderWeather.forEach(
            weather =>
                (message += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`)
        );
        message += `</div>`;

        console.log(message);
    }
}
