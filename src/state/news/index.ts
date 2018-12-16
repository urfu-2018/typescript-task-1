import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private articles = new Array<IArticle>();

    public getArticles() {
        return this.articles;
    }

    public setArticles(articles: IArticle[]) {
        this.articles = articles;
        this.notifyObservers();
    }
}
