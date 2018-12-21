import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private articles: IArticle[] = [];
    public getArticles() {
        return this.articles;
    }

    public setArticles(articles: IArticle[]) {
        this.articles.push(...articles);
        this.notifyObservers();
    }
}
