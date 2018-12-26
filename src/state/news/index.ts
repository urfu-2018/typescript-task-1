import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private _newsArticles: IArticle[] = [];

    public getArticles() {
        return this._newsArticles;
    }

    public setArticles(articles: IArticle[]) {
        this._newsArticles = articles;
        this.notifyObservers();
    }
}
