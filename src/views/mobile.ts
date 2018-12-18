import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { CommonView } from './common-view';

export class MobileView extends CommonView implements IObserver, IView {
    constructor() {
        super(1, 1);
    }

    public update(observable: IObservable) {
        super.commonUpdate(observable);
        if (this.isRenderNeeded()) {
            this.render();
        }
    }

    public render() {
        let result = '<div class="mobile">\n';
        result += this.preRender();
        result += '</div>';
        console.log(result);
    }
}
