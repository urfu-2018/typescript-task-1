import { Observable } from '../../utils/observable';
import { IArticle, INewsState } from './types';

export class NewsState extends Observable implements INewsState {
    public getArticles() {
        return [];
    }

    public setArticles(articles: IArticle[]) {
        throw new Error('Not implemented');
    }
}
