import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { BaseView } from './baseView';

export class DesktopView extends BaseView implements IObserver, IView {
    private lastResult: string = '';
    constructor() {
        super(3, 2, `desktop`);
    }

    public update(observable: IObservable) {
        super.updateData(observable);

        const result = super.getResultString();

        if (this.lastResult !== result) {
            this.lastResult = result;
            this.render();
        }
    }

    public render() {
        console.log(this.lastResult);
    }
}
