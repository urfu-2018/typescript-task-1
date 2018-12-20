import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class MobileView extends DataViewer implements IObserver, IView {
    public update(observable: IObservable) {
        const viewer = new DataViewer();
        this.content += viewer.printContent(observable, 'mobile', 1, 1);

        this.render();
    }

    public render() {
        console.log(this.content);
    }
}
