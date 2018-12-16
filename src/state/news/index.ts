import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private articles: IArticle[] = [];

    public getArticles() {
        return JSON.parse(JSON.stringify(this.articles));
    }

    public setArticles(articles: IArticle[]) {
        this.articles = articles;
        this.notifyObservers();
    }
}
