import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class DesktopView extends DataViewer implements IObserver, IView {
    private COUNT_OF_ARTICLES = 3;
    private COUNT_OF_MEASUREMENTS = 2;

    public update(observable: IObservable) {
        this.data += DataViewer.printContent(
            observable,
            this.COUNT_OF_ARTICLES,
            this.COUNT_OF_MEASUREMENTS
        );

        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.data}</div>`);
    }
}
