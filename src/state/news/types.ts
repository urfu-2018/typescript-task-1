import { AbstractState } from '../types';

export interface IArticle {
    time: string; // e.g. '23:00'
    category: string; // e.g. 'Веб-разработка'
    title: string; // e.g. 'Краткое руководство по Redux для начинающих'
}

export interface INewsState {
    getArticles(): IArticle[];
    setArticles(articles: IArticle[]): void;
}

export function isINewsState(obj: AbstractState): obj is INewsState {
    obj = obj as INewsState;
    return obj.getArticles !== undefined && obj.setArticles !== undefined;
}
