import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { Content } from './content';

export class MobileView implements IObserver, IView {
    private dates: Set<IObservable | NewsState | WeatherState> = new Set();
    private lastContent?: string;
    private article: string = '';
    private weatherMeasurement: string = '';

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
                this.article = Content.getNewsContent(date, 1);
            }
            if (date instanceof WeatherState) {
                this.weatherMeasurement = Content.getWeatherContent(date, 1);
            }
        });
        return `<div class="mobile">\n${this.article}${this.weatherMeasurement}</div>`;
    }
}
