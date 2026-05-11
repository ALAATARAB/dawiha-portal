import type { NotificationType } from '../../common/dtos/notification/create-custom-notification.dto'

export type NotificationListItem = {
    id: number
    type: NotificationType
    title: string
    message: string
    receiverName: string
    isRead: boolean
    isSeen: boolean
    createdAt: string
}
