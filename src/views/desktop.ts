import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { WeatherState } from '../state/weather';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';
import { Render } from '../render/index';
import { getInfo } from './helper';

export class DesktopView implements IObserver, IView {
    private articleCount: number = 3;
    private weatherCount: number = 2;
    private htmlClass: string = 'desktop';
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private markup: string = '';

    public update(observable: IObservable) {
        const { articles, measurements } = getInfo(
            observable,
            this.articleCount,
            this.weatherCount
        );

        this.articles = articles;
        this.measurements = measurements;

        this.markup = Render.createView(this.articles, this.measurements, this.htmlClass);
        this.render();
    }

    public render() {
        console.log(this.markup);
    }
}
