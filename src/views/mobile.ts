import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private dates: Set<IObservable> = new Set();
    public update(observable: IObservable) {
        this.dates.add(observable);
        this.render();
    }

    public render() {
        let content: string = '<div class="mobile">';
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                const freshNews = date.getArticles()[-1];
                content += `[${freshNews.time}] 
                ${freshNews.category} - ${freshNews.title}\n`;
            } else if (date instanceof WeatherState) {
                const latestWeather = date.getMeasurements()[-1];
                content += `[${latestWeather.time}] 
                ${latestWeather.temperature} C, ${latestWeather.pressure} P, 
                ${latestWeather.humidity} U\n`;
            }
        });
        content += '</div>';
        return content;
    }
}
