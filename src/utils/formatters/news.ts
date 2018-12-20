import { IArticle } from '../../state/news/types';

export function formatArticle(article: IArticle) {
    return `[${article.time}] ${article.category} - ${article.title}`;
}
