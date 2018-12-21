import { IObservable, IObserver } from '../utils/observable/types';
import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';
import { Queue } from '../utils/queue';
import { IView } from './types';

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
                return;
            }
        }
        throw new Error('Unknown IObservable implementation');
    }

    public render() {
        const news: string[] = this.news.getAll().map(this.articleToString);
        const measures: string[] = this.weather.getAll().map(this.measureToString);

        const text: string = [`<div class="${this.className}">`]
            .concat(news)
            .concat(measures)
            .concat(['</div>'])
            .join('\n');

        console.log(text);
    }

    private articleToString(acticle: IArticle): string {
        return `[${acticle.time}] ${acticle.category} - ${acticle.title}`;
    }

    private measureToString(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`;
    }

    private tryUpdateWeather(observable: IObservable) {
        if (observable instanceof WeatherState) {
            this.updateCheckNew(this.weather, observable.getMeasurements());
            return true;
        }
        return false;
    }

    private tryUpdateNews(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.updateCheckNew(this.news, observable.getArticles());
            return true;
        }
        return false;
    }

    private updateCheckNew<T>(queue: Queue<T>, items: T[]) {
        const anyNewItem: boolean = queue.enqueueAll(items);
        if (anyNewItem) {
            this.render();
        }
    }
}
