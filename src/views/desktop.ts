import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { DataViewer } from './viewer';

export class DesktopView extends DataViewer implements IObserver, IView {
    private readonly countOfArticles = 3;
    private readonly countOfMeasurements = 2;

    public update(observable: IObservable) {
        this.data += DataViewer.printContent(
            observable,
            this.countOfArticles,
            this.countOfMeasurements
        );

        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.data}</div>`);
    }
}
