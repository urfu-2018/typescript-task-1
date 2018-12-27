import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private newsArticles: IArticle[] = [];

    public getArticles() {
        return this.newsArticles;
    }

    public setArticles(articles: IArticle[]) {
        this.newsArticles = articles;
        this.notifyObservers();
    }
}
