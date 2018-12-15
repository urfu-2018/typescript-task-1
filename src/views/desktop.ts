import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { createResultView } from './helper';

export class DesktopView implements IObserver, IView {
    private articleCount: number = 3;
    private weatherCount: number = 2;
    private htmlClass: string = 'desktop';
    private markup: string = '';

    public update(observable: IObservable) {
        this.markup = createResultView(
            observable,
            this.articleCount,
            this.weatherCount,
            this.htmlClass
        );
        this.render();
    }

    public render() {
        console.log(this.markup);
    }
}
