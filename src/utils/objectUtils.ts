export function isEqual<T extends object>(a: T, b: T): boolean {
    if (typeof a !== 'object') {
        return a === b;
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
        const keys = Reflect.ownKeys(a);
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

export function deepCopy<T extends object>(a: T): T {
    if (typeof a !== 'object') {
        return a;
    } else if (a instanceof Array) {
        const arrayCopy = [];
        for (let i = 0; i < a.length; i++) {
            arrayCopy[i] = deepCopy(a[i]);
        }

        return arrayCopy as T;
    } else {
        const keys = Reflect.ownKeys(a);
        const copy = {};

        for (const key of keys) {
            const descr = Object.getOwnPropertyDescriptor(a, key);
            if (!descr) {
                // never reaches
                throw TypeError();
            }
            descr.value = deepCopy((a as any)[key]);
            Object.defineProperty(copy, key, descr);
        }

        return copy as T;
    }
}
