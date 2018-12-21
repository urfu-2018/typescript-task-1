export function changed(a: any[], b: any[]): boolean {
    if (a.length !== b.length) {
        return true;
    }

    for (let i = 0; i < a.length; i++) {
        const areEqual = objectEqual(a[i], b[i]);
        if (!areEqual) {
            return true;
        }
    }

    return false;
}

function objectEqual(objA: any, objB: any) {
    if (objA === objB) {
        return true;
    }

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
        return false;
    }

    // когда линтер возомнил себя статическим анализатором
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < keysA.length; i++) {
        if (!Object.hasOwnProperty.call(objB, keysA[i]) || objA[keysA[i]] === objB[keysA[i]]) {
            return false;
        }
    }

    return true;
}
