import { IObservable, IObserver } from '../utils/observable/types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';
import { Queue } from '../utils/queue';
import { IView } from './types';
import { Observable } from '../utils/observable';

export class View implements IObserver, IView {
    private readonly updateMethods: Array<(obserbable: IObservable) => boolean> = [
        arg => this.tryUpdateWeather(arg),
        arg => this.tryUpdateNews(arg)
    ];

    private readonly className: string;
    private readonly news: Queue<IArticle>;
    private readonly weather: Queue<IMeasurement>;

    constructor(newsCount: number, weatherCount: number, className: string) {
        this.weather = new Queue<IMeasurement>(weatherCount);
        this.news = new Queue<IArticle>(newsCount);
        this.className = className;
    }

    public update(observable: IObservable) {
        for (const i in this.updateMethods) {
            if (this.updateMethods[i](observable)) {
                this.render();
                return;
            }
        }
        throw new Error('Unknown IObservable implementation');
    }

    public render() {
        let news = this.news.map(this.)

        lines.unshift(`<div class="${this.className}">`);
        lines.push('</div>');

        console.log(lines.join('\n'));
    }

    ?8 *

    private itemToString(item: IArticle | IMeasurement): string {
        if (item instanceof IArticle) {
            return `[${item.time}] ${item.category} - ${item.title}`;
        } else {
            return `[${item.time}] ${item.temperature} C, ${item.pressure} P, ${item.humidity} U`;
        }
    }

    private tryUpdateWeather(obserbable: IObservable): boolean {
        if (obserbable instanceof WeatherState) {
            this.weather.enqueueAll(obserbable.getMeasurements());
            return true;
        }
        return false;
    }

    private tryUpdateNews(obserbable: IObservable): boolean {
        if (obserbable instanceof NewsState) {
            this.news.enqueueAll(obserbable.getArticles());
            return true;
        }
        return false;
    }
}
