import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { UpdateableView } from './view';

export class MobileView extends UpdateableView implements IObserver, IView {
    public update(observable: IObservable) {
        super.handleObservable(observable);
        this.render();
    }

    public render() {
        const WRAPPER_CLASS = 'mobile';
        const NEWS_COUNT = 1;
        const WEATHER_COUNT = 1;
        super.renderEntries(WRAPPER_CLASS, NEWS_COUNT, WEATHER_COUNT);
    }
}
