import { IUpdateableView } from './types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news/';
import { WeatherState } from '../state/weather/';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';

export class UpdateableView implements IUpdateableView {
    private articles: IArticle[] = [];
    private measurements: IMeasurement[] = [];
    private previous: string = ''; // ранее выведенные данные
    private rendered: string = ''; // данные к выводу

    public handleObservable(observable: IObservable, newsCount: number, weatherCount: number) {
        if (observable instanceof NewsState) {
            this.setArticles(observable.getArticles());
        }
        if (observable instanceof WeatherState) {
            this.setMeasurements(observable.getMeasurements());
        }
        let entries: string[] = [];
        entries = entries.concat(this.articles.slice(-newsCount).map(this.renderArticle));
        entries = entries.concat(
            this.measurements.slice(-weatherCount).map(this.renderMeasurement)
        );
        this.rendered = entries.join('\n');
        if (!this.rendered.length) {
            return;
        }
        if (this.previous === this.rendered) {
            this.rendered = '';
        } else {
            this.previous = this.rendered;
        }
    }

    /**
     * Отбирает новости, исключая старые материалы, и дополняя ранее выведенные
     * @param {IArticle[]} entries
     */
    public setArticles(entries: IArticle[]) {
        entries.forEach((entry: IArticle) => {
            if (this.articles.includes(entry)) {
                return;
            }
            this.articles.push(entry);
        });
    }

    /**
     * Отбирает погоду, исключая старые материалы, и дополняя ранее выведенные
     * @param {IMeasurement[]} entries
     */
    public setMeasurements(entries: IMeasurement[]) {
        entries.forEach((entry: IMeasurement) => {
            if (this.measurements.includes(entry)) {
                return;
            }
            this.measurements.push(entry);
        });
    }

    /**
     * Проверяет есть ли данные для вывода
     * @returns {boolean}
     */
    public shouldOutputEntries(): boolean {
        return this.rendered.length > 0;
    }

    /**
     * Выводит блок новостей и погоды на экран
     * @param {string} classModifier - имя класса блока-обертки
     */
    public outputRendered(classModifier: string) {
        if (!this.shouldOutputEntries()) {
            return;
        }
        console.log(`<div class="${classModifier}">\n${this.rendered}\n</div>`);
    }

    public renderArticle(entry: IArticle): string {
        return `[${entry.time}] ${entry.category} - ${entry.title}`;
    }

    public renderMeasurement(entry: IMeasurement): string {
        return `[${entry.time}] ${entry.temperature} C, ${entry.pressure} P, ${entry.humidity} U`;
    }
}
