import { IObservable, IObserver } from '../utils/observable/types';
import { IMeasurement, IWeatherState, MeasurementToString } from '../state/weather/types';
import { ArticleToString, IArticle, INewsState } from '../state/news/types';

export interface IView {
    render(): void;
}

export class View implements IObserver, IView {
    private measurements: IMeasurement[] = [];
    private articles: IArticle[] = [];
    private articleRightAmount = 0;
    private measurementsRightAmount = 0;
    private viewName = 'default';

    public constructor(
        articleRenderAmount: number,
        measurementsRenderAmount: number,
        viewName: string
    ) {
        this.articleRightAmount = articleRenderAmount;
        this.measurementsRightAmount = articleRenderAmount;
        this.viewName = viewName;
    }

    public update(observable: IObservable) {
        if (this.isNewsState(observable)) {
            this.articles = observable.getArticles();
        } else if (this.isWeatherState(observable)) {
            this.measurements = observable.getMeasurements();
        } else {
            throw new TypeError();
        }

        this.render();
    }

    public render() {
        let content = `<div class="${this.viewName}">\n`;
        this.articles
            .slice(-this.articleRightAmount)
            .forEach(a => (content += ArticleToString(a) + '\n'));
        this.measurements
            .slice(-this.measurementsRightAmount)
            .forEach(m => (content += MeasurementToString(m) + '\n'));
        content += `</div>`;

        console.log(content);
    }

    private isWeatherState(arg: any): arg is IWeatherState {
        return arg.measurements !== undefined;
    }

    private isNewsState(arg: any): arg is INewsState {
        return arg.articles !== undefined;
    }
}
