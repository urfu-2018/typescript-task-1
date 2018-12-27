import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class MobileView extends DataViewer implements IObserver, IView {
    private COUNT_OF_ARTICLES = 1;
    private COUNT_OF_MEASUREMENTS = 1;

    public update(observable: IObservable) {
        this.data += DataViewer.printContent(
            observable,
            this.COUNT_OF_ARTICLES,
            this.COUNT_OF_MEASUREMENTS
        );

        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.data}</div>`);
    }
}
