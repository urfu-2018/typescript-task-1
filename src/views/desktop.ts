import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private dataSources: Set<IObservable> = new Set();

    public update(observable: IObservable) {
        this.dataSources.add(observable);
        this.render();
    }

    public render() {
        const content: string[] = [];

        this.dataSources.forEach(source => {
            if (source instanceof NewsState) {
                const lastArticles = source.getArticles().slice(-3);
                content.push(...lastArticles.map(this.renderSingleArticle));
            } else if (source instanceof WeatherState) {
                const lastMeasurements = source.getMeasurements().slice(-2);
                content.push(...lastMeasurements.map(this.renderSingleMeasurement));
            }
        });

        console.log(`<div class="desktop">\n${content.join('\n')}\n</div>`);
    }

    private renderSingleArticle(news: IArticle) {
        return `[${news.time}] ${news.category} - ${news.title}`;
    }

    private renderSingleMeasurement(measurement: IMeasurement) {
        return `[${measurement.time}] ${measurement.temperature} C, ${measurement.pressure} P, ${
            measurement.humidity
        } U`;
    }
}
