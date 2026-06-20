import type { NotificationType } from '../../entities/notification/notification.entity'
import type { ProviderType } from '../../entities/provider/provider.entity'

export type UserRole = 'USER' | 'PROVIDER' | 'ADMIN'

export type PregnancyStatus = 'ACTIVE' | 'CANCELED' | 'DONE'

export interface CreateCustomNotificationDto {
  user_ids?: number[]
  roles?: UserRole[]
  provider_type?: ProviderType[]
  pregnancy_status?: PregnancyStatus
  from_age?: number
  to_age?: number
  type: NotificationType
  payload?: Record<string, unknown>
  global?: boolean
  title?: string
  body?: string
}
