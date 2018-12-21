import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private articles: IArticle[] = [];

    public getArticles(): IArticle[] {
        return this.articles;
    }

    public setArticles(articles: IArticle[]): void {
        this.articles = articles;
        this.notifyObservers();
    }
}
