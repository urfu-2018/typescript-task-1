/* tslint:disable:prefer-for-of */
export function areArraysEqual(first: any[], second: any[]) {
    if (first.length !== second.length) {
        return false;
    }

    for (let i = 0; i < first.length; i++) {
        const areEqual = compare(first[i], second[i]);
        if (!areEqual) {
            return false;
        }
    }

    return true;
}

function compare(a: any, b: any) {
    if (a === b) {
        return true;
    }

    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) {
        return false;
    }

    for (let i = 0; i < keysA.length; i++) {
        const key = keysA[i];
        if (!Object.hasOwnProperty.call(b, key) || a[key] === b[key]) {
            return false;
        }
    }

    return true;
}
