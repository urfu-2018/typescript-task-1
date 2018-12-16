export function equal(old: any[], current: any[]) {
    if (old.length !== current.length) {
        return false;
    }

    return old.every((value, index) => value === current[index]);
}
