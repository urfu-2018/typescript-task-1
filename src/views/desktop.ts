import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class DesktopView implements IObserver, IView {
    private dates: Set<IObservable> = new Set();

    public update(observable: IObservable) {
        this.dates.add(observable);
        this.render();
    }

    public render() {
        let content: string = '<div class="desktop">\n';
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                date.getArticles()
                    .slice(-3)
                    .forEach(article => {
                        content += `[${article.time}] ${article.category} - ${article.title}\n`;
                    });
            }
            if (date instanceof WeatherState) {
                date.getMeasurements()
                    .slice(-2)
                    .forEach(weather => {
                        content += `[${weather.time}] ${weather.temperature} C, ${
                            weather.pressure
                        } P, ${weather.humidity} U\n`;
                    });
            }
        });
        content += '</div>';
        console.log(content);
    }
}
