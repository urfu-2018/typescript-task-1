import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class DesktopView extends DataViewer implements IObserver, IView {
    public update(observable: IObservable) {
        const viewer = new DataViewer();
        this.content += viewer.printContent(observable, 3, 2);

        if (this.flag) {
            this.render();
        }
    }

    public render() {
        console.log(`<div class="desktop">\n${this.content}</div>`);
    }
}
