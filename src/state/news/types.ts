import { ViewElements } from '../types';

export interface IArticle extends ViewElements {
    time: string; // e.g. '23:00'
    category: string; // e.g. 'Веб-разработка'
    title: string; // e.g. 'Краткое руководство по Redux для начинающих'
}

export interface INewsState {
    getArticles(): IArticle[];
    setArticles(articles: IArticle[]): void;
}
