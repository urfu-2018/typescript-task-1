import { IMeasurement } from '../../state/weather/types';
import { IArticle } from '../../state/news/types';

export class Renderer {
    public static render(
        newsToPrint: IArticle[],
        weatherToPrint: IMeasurement[],
        viewMode: string
    ) {
        const formattedNews = newsToPrint.map(this.formatNews);
        const formattedWeather = weatherToPrint.map(this.formatWheater);
        const output = formattedNews.concat(formattedWeather).join('\n');
        const formatOutput = `<div class="${viewMode}">\n${output}\n</div>`;
        console.log(formatOutput);
    }

    private static formatNews(article: IArticle): string {
        return `[${article.time}] ${article.category} - ${article.title}`;
    }

    private static formatWheater(m: IMeasurement): string {
        return `[${m.time}] ${m.temperature} C, ${m.pressure} P, ${m.humidity} U`;
    }
}
