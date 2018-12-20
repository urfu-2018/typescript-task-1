import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { RenderDataContainer, RenderDataProvider } from './renderData';

export class DesktopView extends RenderDataContainer implements IObserver, IView {
    public update(observable: IObservable) {
        this.renderData += RenderDataProvider.provide(observable, 3, 2);
        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.renderData}</div>`);
    }
}
