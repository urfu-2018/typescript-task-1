"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const news_1 = require("../state/news");
const weather_1 = require("../state/weather");
class DesktopView {
    constructor() {
        this.currentNews = [];
        this.currentWeather = [];
        this.newsToRender = [];
        this.weatherToRender = [];
    }
    update(observable) {
        if (observable instanceof news_1.NewsState) {
            const all = observable.getArticles();
            this.newsToRender = all.slice(all.length - DesktopView.newsCount);
        }
        else if (observable instanceof weather_1.WeatherState) {
            const all = observable.getMeasurements();
            this.weatherToRender = all.slice(all.length - DesktopView.weatherCount);
        }
        else {
            throw new Error('Wrong state: should be news or weather');
        }
        if (this.currentNews !== this.newsToRender ||
            this.currentWeather !== this.weatherToRender) {
            this.render();
        }
    }
    render() {
        let result = '<div class="desktop">\n';
        this.newsToRender.forEach(n => (result += `[${n.time}] ${n.category} - ${n.title}\n`));
        this.weatherToRender.forEach(w => (result += `[${w.time}] ${w.temperature} C, ${w.pressure} P, ${w.humidity} U\n`));
        result += '</div>';
        console.log(result);
        this.currentNews.splice(0, this.currentNews.length, ...this.newsToRender);
        this.currentWeather.splice(0, this.currentWeather.length, ...this.weatherToRender);
    }
}
DesktopView.newsCount = 3;
DesktopView.weatherCount = 2;
exports.DesktopView = DesktopView;
