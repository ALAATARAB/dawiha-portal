import type { NotificationType } from '../../entities/notification/notification.entity'

export type UserRole = 'USER' | 'PROVIDER' | 'ADMIN'

export interface CreateCustomNotificationDto {
  user_ids?: number[]
  roles?: UserRole[]
  type: NotificationType
  payload?: Record<string, unknown>
  global?: boolean
  title?: string
  body?: string
}
