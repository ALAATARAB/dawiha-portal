export type NotificationType = 'REVIEW' | 'TASK' | 'REQUEST' | 'SUBSCRIPTION' | 'PURCHASE_SERVICE' | 'PURCHASE_PRODUCT' | 'PURCHASE_PLAN' | 'CUSTOM';

export type UserRole = 'SUPPORTED' | 'SUPPORTER' | 'PROVIDER' | 'SUPPLIER' | 'ADMIN' | 'CASE_MANAGER' | 'SUPER_ADMIN';

export interface CreateCustomNotificationDto {
  user_ids?: number[];
  roles?: UserRole[];
  type: NotificationType;
  payload?: Record<string, unknown>;
  global?: boolean;
  title?: string;
  body?: string;
}
