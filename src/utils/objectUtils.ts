interface ViewElements {
    [key: string]: string | number;
}

export function isEqual<T extends ViewElements>(a: T[], b: T[]): boolean {
    if (a.length !== b.length) {
        return false;
    }
    for (let i = 0; i < a.length; i++) {
        if (!areObjectsEqual(a[i], b[i])) {
            return false;
        }
    }

    return true;
}

function areObjectsEqual<T extends ViewElements>(a: T, b: T): boolean {
    if (!a || !b) {
        return a === b;
    } else {
        const keys = Object.getOwnPropertyNames(a);
        for (const key of keys) {
            if (!b.hasOwnProperty(key) || a[key] !== b[key]) {
                return false;
            }
        }
    }

    return true;
}

// оставим дженерик, чтобы сохранить информацию о типе на выходе
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
