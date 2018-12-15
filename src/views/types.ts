import { renderArticle, IArticle, INewsState } from '../state/news/types';
import { renderMeasurment, IMeasurement, IWeatherState } from '../state/weather/types';
import { IObservable, IObserver } from '../utils/observable/types';

export interface IView {
    render(): void;
}

export class ViewBase implements IView, IObserver {
    protected weatherMeasurments: IMeasurement[] = [];
    protected articles: IArticle[] = [];
    protected maxWeatherCount: number = 0;
    protected maxArticleCount: number = 0;
    protected viewName: string = '';
    protected lastRenderedPage: string = '';

    public update(observable: IObservable): void {
        if (this.isINewsState(observable)) {
            this.articles = (observable as INewsState).getArticles();
        } else if (this.isIWeatherState(observable)) {
            this.weatherMeasurments = (observable as IWeatherState).getMeasurements();
        } else {
            throw new TypeError('Only INewsState and IWeatherState are supported!');
        }
        const newPage = this.preRender();
        if (newPage !== this.lastRenderedPage) {
            this.lastRenderedPage = newPage;
            this.render();
        }
    }

    public render(): void {
        console.log(this.lastRenderedPage);
    }

    private isINewsState(observable: any): observable is INewsState {
        return (observable as INewsState).getArticles !== undefined;
    }

    private isIWeatherState(observable: any): observable is IWeatherState {
        return (observable as IWeatherState).getMeasurements !== undefined;
    }

    private preRender(): string {
        return (
            `<div class="${this.viewName}">\n` + this.renderNews() + this.renderWeather() + '</div>'
        );
    }

    private renderNews(): string {
        return this.renderItems(this.articles, renderArticle, this.maxWeatherCount);
    }

    private renderWeather(): string {
        return this.renderItems(this.weatherMeasurments, renderMeasurment, this.maxWeatherCount);
    }

    private renderItems(
        items: any[],
        toString: (obj: any) => string,
        elementsCount: number
    ): string {
        return (
            items
                .slice(items.length - elementsCount)
                .map(toString)
                .join('\n') + (items.length > 0 && elementsCount > 0 ? '\n' : '')
        );
    }
}
