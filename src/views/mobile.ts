import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { contentCollection } from './viewer';

export class MobileView implements IObserver, IView {
    private readonly countOfArticles = 1;
    private readonly countOfMeasurements = 1;
    private data = '';

    public update(observable: IObservable) {
        this.data += contentCollection(observable, this.countOfArticles, this.countOfMeasurements);

        this.render();
    }

    public render() {
        console.log(`<div class="mobile">\n${this.data}</div>`);
    }
}
