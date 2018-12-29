import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class MobileView extends DataViewer implements IObserver, IView {
    private readonly countOfArticles = 1;
    private readonly countOfMeasurements = 1;

    public update(observable: IObservable) {
        this.data += DataViewer.printContent(
            observable,
            this.countOfArticles,
            this.countOfMeasurements
        );

        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.data}</div>`);
    }
}
