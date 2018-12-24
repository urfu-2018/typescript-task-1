import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private news: IArticle[] = [];
    public getArticles() {
        return this.news;
    }

    public setArticles(articles: IArticle[]) {
        this.news = articles;
        this.notifyObservers();
    }
}
