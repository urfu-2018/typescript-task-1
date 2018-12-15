import { IObservable, IObserver } from '../utils/observable/types';
import { IView } from './types';
import { articleToString, IArticle, INewsState } from '../state/news/types';
import { measurementToString, IMeasurement, IWeatherState } from '../state/weather/types';

export class DesktopView implements IObserver, IView {
    private static isInstanceOfINewsState(obj: any): obj is INewsState {
        return 'getArticles' in obj;
    }

    private static isInstanceOfIWeatherState(obj: any): obj is IWeatherState {
        return 'getMeasurements' in obj;
    }

    private news: IArticle[] = [];
    private weatherReports: IMeasurement[] = [];

    public update(observable: IObservable) {
        if (DesktopView.isInstanceOfINewsState(observable)) {
            this.news = (observable as INewsState).getArticles();
        } else if (DesktopView.isInstanceOfIWeatherState(observable)) {
            this.weatherReports = (observable as IWeatherState).getMeasurements();
        } else {
            throw new TypeError('Unsupported event type');
        }
        this.render();
    }

    public render() {
        const articles = this.news
            .slice(this.news.length - 3)
            .map(article => articleToString(article));
        const reports = this.weatherReports
            .slice(this.weatherReports.length - 2)
            .map(report => measurementToString(report));
        const rendered =
            '<div class="desktop">\n' + articles.concat(reports).join('\n') + '\n</div>';
        console.log(rendered);
    }
}
