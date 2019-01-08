import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export class MobileView implements IObserver, IView {
    private articles: IArticle[] = [];
    private weathers: IMeasurement[] = [];
    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-1);
        }
        if (observable instanceof WeatherState) {
            this.weathers = observable.getMeasurements().slice(-1);
        }
        this.render();
    }

    public render() {
        let answer = '<div class="mobile">\n';
        this.articles.forEach(element => {
            if (element !== undefined) {
                answer = `${answer}[${element.time}] ${element.category} - ${element.title}\n`;
            }
        });
        this.weathers.forEach(element => {
            if (element !== undefined) {
                answer = `${answer}[${element.time}] ${element.temperature} C, ${
                    element.pressure
                } P, ${element.humidity} U\n`;
            }
        });
        console.log(`${answer}</div>`);
    }
}
