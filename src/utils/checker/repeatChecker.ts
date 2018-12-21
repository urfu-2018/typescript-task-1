import { IArticle } from '../../state/news/types';
import { IMeasurement } from '../../state/weather/types';

export class RepeatChecker {
    public static oldData: string = '';

    public static check(lastNews: IArticle[], lastWeather: IMeasurement[]) {
        let newData = '';
        if (lastNews.length > 0) {
            newData += this.newsToString(lastNews[lastNews.length - 1]);
        }
        if (lastWeather.length > 0) {
            newData += this.weatherToString(lastWeather[lastWeather.length - 1]);
        }
        if (this.oldData !== newData) {
            this.oldData = newData;
            return true;
        }

        return false;
    }

    private static newsToString(article: IArticle) {
        return `${article.time}${article.category}${article.title}`;
    }

    private static weatherToString(m: IMeasurement) {
        return `${m.time}${m.temperature}${m.pressure}${m.humidity}`;
    }
}
