import { IObservable, IObserver } from '../utils/observable/types';
import { IView, ViewType } from './types';
import { renderView } from './helpers';
import { ViewState } from './state';

export class DesktopView implements IObserver, IView {
    public state = new ViewState();

    public update(observable: IObservable) {
        if (this.state.update(observable)) {
            this.render();
        }
    }

    public render() {
        const articles = this.state.articles.slice(-3);
        const measurements = this.state.measurements.slice(-2);
        console.log(renderView(ViewType.Desktop, articles, measurements));
    }
}
