import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';

export class MobileView implements IObserver, IView {
    private dataSources: Set<IObservable> = new Set();

    public update(observable: IObservable) {
        this.dataSources.add(observable);
        this.render();
    }

    public render() {
        const content: string[] = [];

        this.dataSources.forEach(source => {
            if (source instanceof NewsState) {
                const lastArticle = source.getArticles().slice(-1)[0];
                if (lastArticle) {
                    content.push(this.renderSingleArticle(lastArticle));
                }
            } else if (source instanceof WeatherState) {
                const lastMeasurement = source.getMeasurements().slice(-1)[0];
                if (lastMeasurement) {
                    content.push(this.renderSingleMeasurement(lastMeasurement));
                }
            }
        });

        console.log(`<div class="mobile">\n${content.join('\n')}\n</div>`);
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
