import { IObserver } from '../utils/observable/types';
import { IView, View } from './types';
// import { NewsState } from '../state/news';
// import { WeatherState } from '../state/weather';

export class DesktopView extends View implements IObserver, IView {
    constructor() {
        super('desktop', [], [], 3, 2);
    }

    // public render(): void {
    //     console.log(this.getFormattedNewsAndWeather());
    // }
    //
    // public update(observable: IObservable) {
    //     if (observable instanceof NewsState) {
    //         this.news = observable.getArticles();
    //         // this.render();
    //     }
    //     if (observable instanceof WeatherState) {
    //         this.weather = observable.getMeasurements();
    //     }
    //     this.render();
    // }
}
