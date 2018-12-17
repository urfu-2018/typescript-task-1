import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { UpdateableView } from './view';

export class DesktopView extends UpdateableView implements IObserver, IView {
    public update(observable: IObservable) {
        const NEWS_COUNT = 3;
        const WEATHER_COUNT = 2;
        super.handleObservable(observable, NEWS_COUNT, WEATHER_COUNT);
        if (this.shouldOutputEntries()) {
            this.render();
        }
    }

    public render() {
        const WRAPPER_CLASS = 'desktop';
        super.outputRendered(WRAPPER_CLASS);
    }
}
