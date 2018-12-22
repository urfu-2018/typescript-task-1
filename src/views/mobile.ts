// import { formatArticle, formatMeasurement} from './format';
// import { IObservable, IObserver } from '../utils/observable/types';
// import { IView } from './types';
// import { IArticle } from '../state/news/types';
// import { IMeasurement } from '../state/weather/types';
// import { WeatherState } from '../state/weather';
// import { NewsState } from '../state/news';
import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { formatArticle, formatMeasurement } from './format';
import { equal } from './utility';

export class MobileView implements IObserver, IView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (observable instanceof WeatherState) {
            const past = this.measurements;
            this.measurements = observable.getMeasurements().slice(-1);
            if (!equal(past, this.measurements)) {
                this.render();
            }
        } else if (observable instanceof NewsState) {
            const past = this.articles;
            this.articles = observable.getArticles().slice(-1);
            if (!equal(past, this.articles)) {
                this.render();
            }
        }
    }

    public render() {
        const newContent = [
            ...this.articles.map(formatArticle),
            ...this.measurements.map(formatMeasurement)
        ];

        console.log(`<div class="mobile">\n${newContent.join('\n')}\n</div>`);
    }
}
