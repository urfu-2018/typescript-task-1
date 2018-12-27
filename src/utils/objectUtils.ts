import { IMeasurement } from '../state/weather/types';
import { IArticle } from '../state/news/types';

export function isEqual(
    array: IArticle[] | IMeasurement[],
    other: IArticle[] | IMeasurement[]
): boolean {
    if (!array || !other) {
        return false;
    }

    if (array.length !== other.length) {
        return false;
    }

    if (typeof array !== typeof other) {
        return false;
    }

    for (let i = 0; i < array.length; i++) {
        if (!itemsEqual(array[i], other[i])) {
            return false;
        }
    }

    return true;
}

function itemsEqual(item: IArticle | IMeasurement, other: IArticle | IMeasurement): boolean {
    if (isArticle(item) && isArticle(other)) {
        for (const key in item) {
            if (item[key] !== other[key]) {
                return false;
            }
        }
    } else if (isMeasurement(item) && isMeasurement(other)) {
        for (const key in item) {
            if (item[key] !== other[key]) {
                return false;
            }
        }
    } else {
        return false;
    }

    return true;
}

function isArticle(arg: IArticle | IMeasurement): arg is IArticle {
    return (arg as IArticle).category !== undefined;
}

function isMeasurement(arg: IArticle | IMeasurement): arg is IMeasurement {
    return (arg as IMeasurement).temperature !== undefined;
}

export function deepCopy<T>(array: T[]): T[] {
    return array.map(x => ({ ...x }));
}
