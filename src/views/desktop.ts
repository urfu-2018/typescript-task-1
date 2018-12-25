import { IObservable, IObserver } from '../utils/observable/types';
import { View } from './view';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';

export class DesktopView extends View implements IObserver, IView {
    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.setLastArticles(observable.getArticles(), 3);
        }

        if (observable instanceof WeatherState) {
            this.setLastMeasurements(observable.getMeasurements(), 2);
        }

        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.getRenderedString()}\n</div>`);
    }
}
