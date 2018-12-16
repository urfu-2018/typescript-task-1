import { IUpdateableView } from './types';
import { IArticle } from '../state/news/types';
import { NewsState } from '../state/news/';
import { WeatherState } from '../state/weather/';
import { IMeasurement } from '../state/weather/types';
import { IObservable } from '../utils/observable/types';

export class UpdateableView implements IUpdateableView {
    private articles: IArticle[] = []; // отрендеренные новости
    private nextArticles: IArticle[] = []; // новости для вывода (без старых материалов)
    private measurements: IMeasurement[] = []; // отрендеренная погода
    private nextMeasurements: IMeasurement[] = []; // погода для вывода (без старых материалов)

    /**
     * Сохраняет Новости и Погоду для вывода
     * @param {IObservable} observable
     * @returns void
     */
    public handleObservable(observable: IObservable) {
        if (observable instanceof NewsState) {
            this.setArticles(observable.getArticles());
        }
        if (observable instanceof WeatherState) {
            this.setMeasurements(observable.getMeasurements());
        }
    }

    /**
     * Отбирает новости, исключая старые материалы, и дополняя ранее выведенные
     * @param {IArticle[]} entries
     */
    public setArticles(entries: IArticle[]) {
        this.nextArticles = entries.filter((entry: IArticle) => {
            const EXISTS = this.articles.indexOf(entry) !== -1;
            if (!EXISTS) {
                this.articles.push(entry);
            }

            return !EXISTS;
        });
    }

    /**
     * Отбирает погоду, исключая старые материалы, и дополняя ранее выведенные
     * @param {IMeasurement[]} entries
     */
    public setMeasurements(entries: IMeasurement[]) {
        this.nextMeasurements = entries.filter((entry: IMeasurement) => {
            const EXISTS = this.measurements.indexOf(entry) !== -1;
            if (!EXISTS) {
                this.measurements.push(entry);
            }

            return !EXISTS;
        });
    }

    /**
     * Выводит блок новостей и погоды на экран
     * @param {string} classModifier - имя класса блока-обертки
     * @param {number} newsCount - количество материалов новостей к выводу
     * @param {number} weatherCount - количество материалов погоды к выводу
     */
    public renderEntries(classModifier: string, newsCount: number, weatherCount: number) {
        if (!this.nextArticles.length && !this.nextMeasurements.length) {
            return;
        }
        let rendered: string[] = [];
        rendered = rendered.concat(this.nextArticles.slice(0, newsCount).map(this.renderArticle));
        rendered = rendered.concat(
            this.nextMeasurements.slice(0, weatherCount).map(this.renderMeasurement)
        );
        console.log(`<div class="${classModifier}">\n${rendered.join('\n')}\n</div>`);
    }

    public renderArticle(entry: IArticle): string {
        return `[${entry.time}] ${entry.category} - ${entry.title}`;
    }

    public renderMeasurement(entry: IMeasurement): string {
        return `[${entry.time}] ${entry.temperature} C, ${entry.pressure} P, ${entry.humidity} U`;
    }
}
