import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { UpdateableView } from './view';

export class DesktopView extends UpdateableView implements IObserver, IView {
    public update(observable: IObservable) {
        super.handleObservable(observable);
        if (this.hasNotRenderedEntries()) {
            this.render();
        }
    }

    public render() {
        const WRAPPER_CLASS = 'desktop';
        const NEWS_COUNT = 3;
        const WEATHER_COUNT = 2;
        super.renderEntries(WRAPPER_CLASS, NEWS_COUNT, WEATHER_COUNT);
    }
}
