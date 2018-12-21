import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class MobileView extends DataViewer implements IObserver, IView {
    public update(observable: IObservable) {
        const viewer = new DataViewer();
        this.content += viewer.printContent(observable, 1, 1);

        if (this.flag) {
            this.render();
        }
    }

    public render() {
        console.log(`<div class="mobile">\n${this.content}</div>`);
    }
}
