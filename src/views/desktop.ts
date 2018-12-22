// import { IObservable, IObserver } from '../utils/observable/types';
// import { WeatherState } from '../state/weather/index';
// import { NewsState } from '../state/news/index';
// import { IView } from './types';
import { View } from './view';

export class DesktopView extends View {
    constructor() {
        super(3, 2, 'desktop');
    }
}
