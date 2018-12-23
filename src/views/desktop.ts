import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { CommonView } from './common-view';

export class DesktopView extends CommonView implements IObserver, IView {
    constructor() {
        const newsCount = 3;
        const weatherCount = 2;
        super(newsCount, weatherCount);
    }

    public update(observable: IObservable) {
        super.commonUpdate(observable);
        if (this.isRenderNeeded()) {
            this.render();
        }
    }

    public render() {
        console.log(`<div class="desktop">\n${this.preRender()}</div>`);
    }
}
