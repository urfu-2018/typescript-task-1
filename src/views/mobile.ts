import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { CommonView } from './common-view';

export class MobileView extends CommonView implements IObserver, IView {
    constructor() {
        const newsCount = 1;
        const weatherCount = 1;
        super(newsCount, weatherCount);
    }

    public update(observable: IObservable) {
        super.commonUpdate(observable);
        if (this.isRenderNeeded()) {
            this.render();
        }
    }

    public render() {
        console.log(`<div class="mobile">\n${this.preRender()}</div>`);
    }
}
