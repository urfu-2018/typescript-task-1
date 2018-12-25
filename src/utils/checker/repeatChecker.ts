import { IArticle } from '../../state/news/types';
import { IMeasurement } from '../../state/weather/types';

export class RepeatChecker {
    private oldNews: IArticle[] = [];
    private oldWheater: IMeasurement[] = [];

    public check(lastNews: IArticle[], lastWeather: IMeasurement[]) {
        if (
            this.oldNews.length !== lastNews.length ||
            this.oldWheater.length !== lastWeather.length ||
            !(
                this.oldNews.every((article, index) => article === lastNews[index]) &&
                this.oldWheater.every((wheater, index) => wheater === lastWeather[index])
            )
        ) {
            this.oldNews = lastNews;
            this.oldWheater = lastWeather;
            return true;
        }

        return false;
    }
}
