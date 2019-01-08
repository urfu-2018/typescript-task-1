export interface IArticle {
    time: string; // e.g. '23:00'
    category: string; // e.g. 'Веб-разработка'
    title: string; // e.g. 'Краткое руководство по Redux для начинающих'
}

export function articleToString({ time, category, title }: IArticle) {
    return `[${time}] ${category} - ${title}`;
}

export interface INewsState {
    getArticles(): IArticle[];
    setArticles(articles: IArticle[]): void;
}
