import { articleEqual, measurementEqual } from '../utils/comparers';
import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function articlesChanged(a: IArticle[], b: IArticle[]): boolean {
    if (a.length !== b.length) {
        return true;
    }

    for (let i = 0; i < a.length; i++) {
        const areEqual = articleEqual(a[i], b[i]);
        if (!areEqual) {
            return true;
        }
    }

    return false;
}

export function measurementsChanged(a: IMeasurement[], b: IMeasurement[]): boolean {
    if (a.length !== b.length) {
        return true;
    }

    for (let i = 0; i < a.length; i++) {
        const areEqual = measurementEqual(a[i], b[i]);
        if (!areEqual) {
            return true;
        }
    }

    return false;
}
