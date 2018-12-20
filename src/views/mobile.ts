import { IObserver } from '../utils/observable/types';
import { IView, View } from './types';
// import { NewsState } from '../state/news';
// import { WeatherState } from '../state/weather';

export class MobileView extends View implements IObserver, IView {
    constructor() {
        super('mobile', [], [], 1, 1);
    }

    // public render(): void {
    //     console.log(this.getFormattedNewsAndWeather());
    // }

    // public update(observable: IObservable) {
    //     if (observable instanceof NewsState) {
    //         this.news = observable.getArticles();
    //         this.render();
    //     }
    //     if (observable instanceof WeatherState) {
    //         this.weather = observable.getMeasurements();
    //     }
    //     // this.render();
    // }
}
