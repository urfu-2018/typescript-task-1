import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';
import { deepCopy } from '../../utils/objectUtils';

export class NewsState extends Observable implements INewsState {
    private articles: IArticle[] = [];

    public getArticles(): IArticle[] {
        return deepCopy(this.articles);
    }

    public setArticles(articles: IArticle[]) {
        this.articles = articles;

        this.notifyObservers();
    }
}
