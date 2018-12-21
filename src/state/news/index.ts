import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private article: IArticle[] = [];

    public getArticles() {
        return this.article;
    }

    public setArticles(articles: IArticle[]) {
        this.article = articles;
        this.notifyObservers();
    }
}
