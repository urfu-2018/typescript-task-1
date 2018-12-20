import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { RenderDataContainer, RenderDataProvider } from './renderData';

export class MobileView extends RenderDataContainer implements IObserver, IView {
    public update(observable: IObservable) {
        this.renderData += RenderDataProvider.provide(observable, 1, 1);
        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.renderData}</div>`);
    }
}
