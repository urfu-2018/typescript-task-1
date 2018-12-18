import { IArticle } from '../../state/news/types';
import { IMeasurement } from '../../state/weather/types';

export function articleEqual(a: IArticle, b: IArticle): boolean {
    return a.category === b.category && a.time === b.time && a.title === b.title;
}

export function measurementEqual(a: IMeasurement, b: IMeasurement): boolean {
    return (
        a.humidity === b.humidity &&
        a.pressure === b.pressure &&
        a.temperature === b.temperature &&
        a.time === b.time
    );
}
