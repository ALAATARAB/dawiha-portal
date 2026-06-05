import type { MediaEntity } from '../media/media.entity'

export type NotificationType =
  | 'CUSTOM'
  | 'APPOINTMENT_CREATED'
  | 'APPOINTMENT_UPDATED'
  | 'REQUEST_CREATED'
  | 'REQUEST_UPDATED'

export interface UserNotificationEntity {
  id: number
  full_name: string
  phone_number?: string
  country_code?: string
  picture?: MediaEntity
  created_at?: string
  updated_at?: string
}

export interface NotificationEntity {
  id: number
  type: NotificationType
  title: string | null
  body: string | null
  payload: Record<string, unknown> | null
  is_read: boolean
  is_seen: boolean
  sender: UserNotificationEntity | null
  receiver: UserNotificationEntity | null
  created_at: string
  updated_at: string
}

export interface NotificationsEntity {
  data: NotificationEntity[]
  meta: {
    current_page: number
    last_page: number
    per_page: number
    from: number
    to: number
    total: number
  }
}
