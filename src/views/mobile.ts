import { IObservable, IObserver } from '../utils/observable/types';
import { IView, ViewType } from './types';
import { renderView } from './helpers';
import { ViewState } from './state';

export class MobileView implements IObserver, IView {
    public state = new ViewState();

    public update(observable: IObservable) {
        if (this.state.update(observable)) {
            this.render();
        }
    }

    public render() {
        const lastArticles = this.state.articles.slice(-1);
        const lastMeasurements = this.state.measurements.slice(-1);
        console.log(renderView(ViewType.Mobile, lastArticles, lastMeasurements));
    }
}
