import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { CommonView } from './common-view';

export class DesktopView extends CommonView implements IObserver, IView {
    constructor() {
        super(3, 2);
    }

    public update(observable: IObservable) {
        super.commonUpdate(observable);
        if (this.isRenderNeeded()) {
            this.render();
        }
    }

    public render() {
        let result = '<div class="desktop">\n';
        result += super.preRender();
        result += '</div>';
        console.log(result);
    }
}
