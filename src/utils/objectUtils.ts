export function isEqual<T extends object>(a: T, b: T): boolean {
    return false;
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
