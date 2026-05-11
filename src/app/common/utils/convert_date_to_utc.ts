export const convertToUTCISOString = (localString?: string) => {
    if (!localString) return undefined
    const date = new Date(localString)
    return new Date(date.getTime()).toISOString()
}

export const reConvertToLocalISOString = (utcString?: string) => {
    if (!utcString) return ''
    const date = new Date(utcString) // parses as UTC, stores internally as local

    // use local parts
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    const hours = String(date.getHours()).padStart(2, '0') // local hours ✅
    const minutes = String(date.getMinutes()).padStart(2, '0') // local minutes ✅

    return `${year}-${month}-${day}T${hours}:${minutes}`
}
