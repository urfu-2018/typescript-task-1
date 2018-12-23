import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { Content } from './content';

export class DesktopView implements IObserver, IView {
    private dates: Set<IObservable | NewsState | WeatherState> = new Set();
    private lastContent?: string;
    private articles = '';
    private weatherMeasurements = '';

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
        this.dates.forEach(date => {
            if (date instanceof NewsState) {
                this.articles = Content.getNewsContent(date, 3);
            }
            if (date instanceof WeatherState) {
                this.weatherMeasurements = Content.getWeatherContent(date, 2);
            }
        });
        return `<div class="desktop">\n${this.articles}${this.weatherMeasurements}</div>`;
    }
}
