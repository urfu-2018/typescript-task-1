import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { createResultView } from './helper';

export class MobileView implements IObserver, IView {
    private articleCount: number = 1;
    private weatherCount: number = 1;
    private htmlClass: string = 'mobile';
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
