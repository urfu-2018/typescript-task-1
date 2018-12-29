import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { contentCollection } from './viewer';

export class DesktopView implements IObserver, IView {
    private readonly countOfArticles = 3;
    private readonly countOfMeasurements = 2;
    private data = '';

    public update(observable: IObservable) {
        this.data += contentCollection(observable, this.countOfArticles, this.countOfMeasurements);

        this.render();
    }

    public render() {
        console.log(`<div class="desktop">\n${this.data}</div>`);
    }
}
