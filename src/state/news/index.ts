import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';
import { IEquals } from '../../utils/types';

export class NewsState extends Observable implements INewsState, IEquals<NewsState> {
    private articles: IArticle[] = [];

    public getArticles() {
        return this.articles;
    }

    public setArticles(articles: IArticle[]) {
        this.articles = articles;
        this.notifyObservers();
    }

    public equals(obj: NewsState | undefined): boolean {
        if (obj === undefined) {
            return false;
        }
        const firstArticles = this.articles;
        const secondsArticles = obj.articles;
        if (firstArticles.length !== secondsArticles.length) {
            return false;
        }
        for (let i = 0; i < firstArticles.length; i++) {
            const firstArticle = this.articles[i];
            const secondsArticle = obj.articles[i];
            if (
                firstArticle.category !== secondsArticle.category ||
                firstArticle.title !== secondsArticle.title ||
                firstArticle.time !== secondsArticle.time
            ) {
                return false;
            }
        }
        return true;
    }
}
