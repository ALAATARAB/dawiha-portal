export const getChangedValues = (
    defaultValues: Record<string, any>,
    currentValues: Record<string, any>,
    keyMap: Record<string, string> = {},
    isPatchMethod?: boolean
) => {
    const changed: Record<string, any> = {}
    Object.keys(currentValues).forEach((key) => {
        const defaultVal = defaultValues[key]
        const currentVal = currentValues[key]
        const hasChanged =
            JSON.stringify(defaultVal) !== JSON.stringify(currentVal)
        if (hasChanged) {
            const mappedKey = keyMap[key] || key
            changed[mappedKey] = currentVal
        }
    })
    if (!isPatchMethod) {
        return {
            ...defaultValues,
            ...changed,
        }
    }
    return changed
}

export const getCreateValues = (
    currentValues: Record<string, any>,
    keyMap: Record<string, string> = {}
) => {
    const result: Record<string, any> = {}
    Object.keys(currentValues).forEach((key) => {
        const mappedKey = keyMap[key] || key
        result[mappedKey] = currentValues[key]
    })
    return result
}
