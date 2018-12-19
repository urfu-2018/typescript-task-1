import { IObserver } from '../utils/observable/types';
import { GlobalView } from './globalView';

export class MobileView extends GlobalView implements IObserver {
    public render() {
        let content = `<div class="mobile">\n`;
        if (this.news.length > 0) {
            const news = this.news[this.news.length - 1];
            content += `[${news.time}] ${news.category} - ${news.title}\n`;
        }

        if (this.weather.length > 0) {
            const weather = this.weather[this.weather.length - 1];
            // tslint:disable-next-line
            content += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${weather.humidity} U\n`;
        }

        content += `</div>`;

        console.log(content);
    }
}
