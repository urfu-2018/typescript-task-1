import { IObserver } from '../utils/observable/types';
import { GlobalView } from './globalView';

export class DesktopView extends GlobalView implements IObserver {
    public render() {
        let content = `<div class="desktop">\n`;
        const newsCount = Math.min(3, this.news.length);
        for (let i = this.news.length - newsCount; i < this.news.length; i++) {
            const news = this.news[i];
            content += `[${news.time}] ${news.category} - ${news.title}\n`;
        }

        const weatherCount = Math.min(2, this.weather.length);
        for (let i = this.weather.length - weatherCount; i < this.weather.length; i++) {
            const w = this.weather[i];
            content += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`;
        }
        content += `</div>`;

        console.log(content);
    }
}
