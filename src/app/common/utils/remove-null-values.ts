// very useful with nestjs dto validation whitelisting mechanisme
export function removeNullValues(obj: any, removeEmptyString = true): any {
    if (Array.isArray(obj)) {
        return obj
            .map((v) => (v && typeof v === 'object' ? removeNullValues(v) : v))
            .filter((v) => !(v === null || (removeEmptyString && v === '')))
    } else {
        return Object.entries(obj)
            .map(([k, v]) => [
                k,
                v && typeof v === 'object' ? removeNullValues(v) : v,
            ])
            .reduce(
                (a, [k, v]) =>
                    v === null || (removeEmptyString && v === '')
                        ? a
                        : (((a as any)[k] = v), a),
                {}
            )
    }
}
