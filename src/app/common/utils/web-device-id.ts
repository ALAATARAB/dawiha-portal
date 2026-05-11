const STORAGE_KEY = 'dawiha-web-device-id'

function randomId(): string {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return crypto.randomUUID()
    }
    return `web-${Date.now()}-${Math.random().toString(36).slice(2, 12)}`
}

/** Stable id per browser for login/logout device_id (swagger). */
export function getWebDeviceId(): string {
    try {
        const existing = localStorage.getItem(STORAGE_KEY)
        if (existing) return existing
        const id = randomId()
        localStorage.setItem(STORAGE_KEY, id)
        return id
    } catch {
        return randomId()
    }
}
