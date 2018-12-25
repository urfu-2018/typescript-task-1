import { IObservable, IObserver } from '../utils/observable/types';
import { View } from './view';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IView } from './types';

export class MobileView extends View implements IObserver, IView {
    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            const isUpdated = this.setLastArticles(observable.getArticles(), 1);
            if (isUpdated) {
                this.render();
            }
        }

        if (observable instanceof WeatherState) {
            const isUpdated = this.setLastMeasurements(observable.getMeasurements(), 1);
            if (isUpdated) {
                this.render();
            }
        }
    }

    public render() {
        console.log(`<div class="mobile">\n${this.getRenderedString()}\n</div>`);
    }
}
