import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { NewsState } from '../state/news';
import { IArticle } from '../state/news/types';
import { WeatherState } from '../state/weather';
import { IMeasurement } from '../state/weather/types';

export abstract class CommonView implements IObserver, IView {
    protected abstract weatherNeedCount: number;
    protected abstract newsNeedCount: number;
    protected abstract className: string;
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private oldRender = '';

    // constructor(className = '', weatherNeedCount = 0, newsNeedCount = 0) {
    //     this.className = className;
    //     this.weatherNeedCount = weatherNeedCount;
    //     this.newsNeedCount = newsNeedCount;
    // }

    public render() {
        let resultRender = `<div class="${this.className}">\n`;
        resultRender += this.articles.map(a => this.getArticleRender(a)).join('');
        resultRender += this.measurements.map(w => this.getMeasurementRender(w)).join('');
        resultRender += '</div>';
        if (this.oldRender !== resultRender) {
            console.log(resultRender);
        }
        this.oldRender = resultRender;
    }

    public update(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.articles = observable.getArticles().slice(-this.newsNeedCount);
            this.render();
        } else if (observable instanceof WeatherState) {
            this.measurements = observable.getMeasurements().slice(-this.weatherNeedCount);
            this.render();
        } else {
            throw new TypeError('Observable should be Weather or News');
        }
    }

    private getArticleRender(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}\n`;
    }

    private getMeasurementRender(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U\n`;
    }
}
