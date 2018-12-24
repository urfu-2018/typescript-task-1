import { IArticle } from '../state/news/types';
import { IMeasurement } from '../state/weather/types';

export function equal<T extends (IArticle) | (IMeasurement)>(old: T[], current: T[]) {
    if (old.length !== current.length) {
        return false;
    }

    return old.every((value, index) => value === current[index]);
}
