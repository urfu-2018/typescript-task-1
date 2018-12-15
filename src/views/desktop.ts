import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { createResultView } from './helper';

export class DesktopView implements IObserver, IView {
    private articleCount: number = 3;
    private wheterCount: number = 2;
    private htmlClass: string = 'desktop';
    private markup: string = '';

    public update(observable: IObservable) {
        this.markup = createResultView(
            observable,
            this.articleCount,
            this.wheterCount,
            this.htmlClass
        );
        this.render();
    }

    public render() {
        if (this.markup) {
            console.log(this.markup);
        }
    }
}
