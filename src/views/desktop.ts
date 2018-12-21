import { View } from './types';

export class DesktopView extends View {
    public render() {
        this.setLastNews(3, 2);
        let message = `<div class="desktop">\n`;
        this.states.news.forEach(
            news => (message += `[${news.time}] ${news.category} - ${news.title}\n`)
        );
        this.states.weather.forEach(
            weather =>
                (message += `[${weather.time}] ${weather.temperature} C, ${weather.pressure} P, ${
                    weather.humidity
                } U\n`)
        );
        message += `</div>`;

        console.log(message);
    }
}
