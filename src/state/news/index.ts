import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private _articles: IArticle[] = [];

    public getArticles() {
        return this._articles;
    }

    public setArticles(articles: IArticle[]) {
        this._articles = articles;
        this.notifyObservers();
    }
}
