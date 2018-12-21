import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { NewsState } from '../state/news';

export class Views implements IObserver, IView {
    private articleCount = 0;
    private measurementsCount = 0;
    private deviceName = '';
    private article: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private resultMarkup = '';

    protected constructor(deviceType: string, articleCount: number, measurementsCount: number) {
        this.deviceName = deviceType;
        this.articleCount = articleCount;
        this.measurementsCount = measurementsCount;
    }

    public update(observable: IObservable): void {
        if (observable instanceof WeatherState) {
            const gotMeasur = observable.getMeasurements();
            this.measurements = gotMeasur.slice(gotMeasur.length - this.measurementsCount);
        } else if (observable instanceof NewsState) {
            const gotArticles = observable.getArticles();
            this.article = gotArticles.slice(gotArticles.length - this.articleCount);
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render() {
        const renderNews = this.article
            .map(art => `[${art.time}] ${art.category} - ${art.title}\n`)
            .join('');
        const renderMeasur = this.measurements
            .map(
                meas =>
                    `[${meas.time}] ${meas.temperature} C, ` +
                    `${meas.pressure} P, ${meas.humidity} U\n`
            )
            .join('');
        const markup = `<div class="${this.deviceName}">\n${renderNews}${renderMeasur}</div>`;
        if (markup !== this.resultMarkup) {
            console.log(markup);
            this.resultMarkup = markup;
        }
    }
}
