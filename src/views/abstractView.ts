import { IObservable, IObserver } from '../utils/observable/types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export abstract class AbstractView implements IObserver, IView {
    constructor(
        private readonly className: string,
        private readonly articlesCount: number,
        private readonly measurementsCount: number,
        private lastArticles: IArticle[] = [],
        private lastMeasurements: IMeasurement[] = [],
        private oldMessage?: string
    ) {
        this.className = className;
        this.articlesCount = articlesCount;
        this.measurementsCount = measurementsCount;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.lastArticles = (observable as NewsState).getArticles().slice(-this.articlesCount);
        } else if (observable instanceof WeatherState) {
            this.lastMeasurements = (observable as WeatherState)
                .getMeasurements()
                .slice(-this.measurementsCount);
        } else {
            throw new TypeError();
        }
        this.render();
    }

    public render(): void {
        const newMessage = `<div class="${this.className}">\n${this.formatArticles() +
            this.formatMeasurements()}</div>`;
        if (newMessage !== this.oldMessage) {
            this.oldMessage = newMessage;
            console.log(this.oldMessage);
        }
    }

    private formatArticles(): string {
        return this.lastArticles.map(x => `[${x.time}] ${x.category} - ${x.title}\n`).join('');
    }

    private formatMeasurements(): string {
        return this.lastMeasurements
            .map(x => `[${x.time}] ${x.temperature} C, ${x.pressure} P, ${x.humidity} U\n`)
            .join('');
    }
}
