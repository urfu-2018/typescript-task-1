export function isEqual<T>(a: T, b: T): boolean {
    if (typeof a !== 'object' || (!a || !b)) {
        return a === b;
    } else if (a.constructor !== b.constructor) {
        return false;
    } else if (a instanceof Array && b instanceof Array) {
        if (a.length !== b.length) {
            return false;
        }
        for (let i = 0; i < a.length; i++) {
            if (!isEqual(a[i], b[i])) {
                return false;
            }
        }
    } else {
        const keys = Object.getOwnPropertyNames(a);
        for (const key of keys) {
            if (b.hasOwnProperty(key)) {
                if (!isEqual((a as any)[key], (b as any)[key])) {
                    return false;
                }
            } else {
                return false;
            }
        }
    }

    return true;
}

export function deepCopy<T>(a: T): T {
    if (typeof a !== 'object' || !a) {
        return a;
    } else if (a instanceof Array) {
        const arrayCopy = [];
        for (let i = 0; i < a.length; i++) {
            arrayCopy[i] = deepCopy(a[i]);
        }

        return (arrayCopy as unknown) as T;
    } else {
        const keys = Object.getOwnPropertyNames(a);
        const copy = {};

        for (const key of keys) {
            const descr = Object.getOwnPropertyDescriptor(a, key);
            if (!descr) {
                // never reaches
                throw TypeError(`Object has no key named ${key}`);
            }
            descr.value = deepCopy((a as any)[key]);
            Object.defineProperty(copy, key, descr);
        }

        return copy as T;
    }
}
