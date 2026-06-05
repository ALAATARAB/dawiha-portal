import type { NotificationType } from '../../entities/notification/notification.entity'

export interface SearchNotificationDto {
  page?: number
  perPage?: number
  type?: NotificationType
  receiver_id?: number
  is_seen?: boolean
  is_read?: boolean
}
