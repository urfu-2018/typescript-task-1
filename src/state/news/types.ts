export interface IArticle {
    time: string; // e.g. '23:00'
    category: string; // e.g. 'Веб-разработка'
    title: string; // e.g. 'Краткое руководство по Redux для начинающих'
}

export function ArticleToString(article: IArticle): string {
    return `[${article.time}] ${article.category} - ${article.title}`;
}

export interface INewsState {
    getArticles(): IArticle[];
    setArticles(articles: IArticle[]): void;
}
