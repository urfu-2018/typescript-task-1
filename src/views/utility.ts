export function equal(past: any[], current: any[]) {
    if (past.length !== current.length) {
        return false;
    }

    return past.every((value, index) => value === current[index]);
}
