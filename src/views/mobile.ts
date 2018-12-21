import { View } from './types';

export class MobileView extends View {
    public render() {
        this.setLastNews(1, 1);
        let message = `<div class="mobile">\n`;
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
