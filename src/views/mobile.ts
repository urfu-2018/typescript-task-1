import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private dates: Set<IObservable> = new Set();
    private lastContent: string | undefined;

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
        let content: string = '<div class="mobile">\n';
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                date.getArticles()
                    .slice(-1)
                    .forEach(article => {
                        content += `[${article.time}] ${article.category} - ${article.title}\n`;
                    });
            } else if (date instanceof WeatherState) {
                date.getMeasurements()
                    .slice(-1)
                    .forEach(weather => {
                        content += `[${weather.time}] ${weather.temperature} C, ${
                            weather.pressure
                        } P, ${weather.humidity} U\n`;
                    });
            }
        });
        content += '</div>';
        return content;
    }
}
