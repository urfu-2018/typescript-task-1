import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { WeatherState } from '../state/weather';
import { Renderer } from '../utils/renderer/renderer';
import { RepeatChecker } from '../utils/checker/repeatChecker';

export class MobileView implements IObserver, IView {
    private newsToPrint: IArticle[] = [];
    private measurementsToPrint: IMeasurement[] = [];
    private checker = new RepeatChecker();

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.newsToPrint = observable.getArticles();
        }
        if (observable instanceof WeatherState) {
            this.measurementsToPrint = observable.getMeasurements();
        }

        if (this.checker.check(this.newsToPrint, this.measurementsToPrint)) {
            this.render();
        }
    }

    public render() {
        Renderer.render(this.newsToPrint.slice(-1), this.measurementsToPrint.slice(-1), 'mobile');
    }
}
