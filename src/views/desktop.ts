import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { ViewUpdater } from './viewUpdater';

export class DesktopView implements IObserver, IView {
    private viewUpdater: ViewUpdater;

    constructor() {
        this.viewUpdater = new ViewUpdater('desktop', 1, 1);
    }

    public update(observable: IObservable) {
        if (this.viewUpdater.update(observable)) {
            this.render();
        }
    }

    public render() {
        console.log(this.viewUpdater.getInfo());
    }
}
