import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    private lastArticles: IArticle[] = [];

    public getArticles(): IArticle[] {
        return this.lastArticles;
    }

    public setArticles(articles: IArticle[]): void {
        this.lastArticles = articles;
        this.notifyObservers();
    }
}
