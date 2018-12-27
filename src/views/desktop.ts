import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { RenderDataProvider } from './render-data';

export class DesktopView implements IObserver, IView {
    private _renderData: string = '';

    public update(observable: IObservable) {
        this.renderData += RenderDataProvider.provide(observable, 3, 2);
        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.renderData}</div>`);
    }

    get renderData(): string {
        return this._renderData;
    }

    set renderData(value: string) {
        this._renderData = value;
    }
}
