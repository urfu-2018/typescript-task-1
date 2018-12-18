function isObjShallowEqual(a: {}, b: {}): boolean {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);

    if (aKeys.length !== bKeys.length) {
        return false;
    }

    for (const key of aKeys) {
        // @ts-ignore
        if (a[key] !== b[key]) {
            return false;
        }
    }

    return true;
}

export function isShallowEqual(a: object[], b: object[]): boolean {
    if (a.length !== b.length) {
        return false;
    }

    for (let i = 0; i < a.length; i++) {
        if (!isObjShallowEqual(a[i], b[i])) {
            return false;
        }
    }

    return true;
}
