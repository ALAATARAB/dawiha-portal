export type NotificationAudience = 'ALL' | 'SUPPORTER' | 'PROVIDER' | 'DEPARTMENT'

export type NotificationItem = {
    id: number
    title: string
    message: string
    isForAll: boolean
    audience: NotificationAudience
    department: string | null
    createdAt: string
    updatedAt: string
}

type NotificationDraft = Omit<NotificationItem, 'id' | 'createdAt' | 'updatedAt'>

const STORAGE_KEY = 'admin.notifications.ui.mock'

const seedData: NotificationItem[] = [
    {
        id: 1,
        title: 'Welcome to Dawiha',
        message: 'This is a demo notification until API is connected.',
        isForAll: true,
        audience: 'ALL',
        department: null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
]

const canUseStorage = () => typeof window !== 'undefined' && !!window.localStorage

const safeParse = (raw: string | null) => {
    if (!raw) return []
    try {
        const parsed = JSON.parse(raw) as NotificationItem[]
        return Array.isArray(parsed) ? parsed : []
    } catch {
        return []
    }
}

const write = (rows: NotificationItem[]) => {
    if (!canUseStorage()) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(rows))
}

export const getNotifications = () => {
    if (!canUseStorage()) return seedData
    const rows = safeParse(window.localStorage.getItem(STORAGE_KEY))
    if (rows.length === 0) {
        write(seedData)
        return seedData
    }
    return rows.sort((a, b) => b.id - a.id)
}

export const getNotificationById = (id: number) =>
    getNotifications().find((row) => row.id === id) ?? null

export const createNotification = (payload: NotificationDraft) => {
    const rows = getNotifications()
    const nextId = rows.length > 0 ? Math.max(...rows.map((x) => x.id)) + 1 : 1
    const now = new Date().toISOString()
    const created: NotificationItem = {
        id: nextId,
        createdAt: now,
        updatedAt: now,
        ...payload,
    }
    write([created, ...rows])
    return created
}

export const updateNotification = (id: number, payload: NotificationDraft) => {
    const rows = getNotifications()
    const updatedRows = rows.map((row) =>
        row.id === id
            ? {
                ...row,
                ...payload,
                updatedAt: new Date().toISOString(),
            }
            : row
    )
    write(updatedRows)
    return updatedRows.find((row) => row.id === id) ?? null
}

export const deleteNotification = (id: number) => {
    const rows = getNotifications()
    const nextRows = rows.filter((row) => row.id !== id)
    write(nextRows)
}
