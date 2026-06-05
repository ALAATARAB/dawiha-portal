# Swagger.yaml Sync Changes

This document summarizes the changes made to sync the portal with the updated swagger.yaml API specification.

## Date: June 2, 2026

## Changes Made

### 1. Ads Entity Updates

#### Updated Files:
- `src/app/common/entities/ads/ads.entity.ts`

#### Changes:
- **Date Types**: Changed date fields from `Date` type to `string` type to match API response
  - `from: Date | null` → `from?: string`
  - `to: Date | null` → `to?: string`
  - `created_at: Date` → `created_at: string`
  - `updated_at: Date` → `updated_at: string`

- **Nullable Fields**: Updated field types to use optional (`?`) instead of union with `null`
  - `image_id: number | null` → `image_id?: number`
  - `provider_id: number | null` → `provider_id?: number`
  - `priority: number | null` → `priority?: number`
  - `url: string | null` → `url?: string`
  - `image?: MediaEntity | null` → `image?: MediaEntity`

- **Meta Fields**: Updated `AdsListEntity.meta` to include all pagination fields:
  - Added: `current_page`, `last_page`, `per_page`, `from`, `to`
  - Kept: `total`

### 2. Request Entity & DTOs

#### Updated Files:
- `src/app/common/entities/request/request.entity.ts`
- `src/app/common/dtos/request/create-request.dto.ts`
- `src/app/common/dtos/request/update-request.dto.ts`

#### Changes:
- **RequestEntity**: Added the following fields to match swagger:
  - `notes?: string` - Optional notes field
  - `provider: ProviderEntity` - Full provider object relation
  - `user: BaseActorEntity` - Full user object relation
  - `category?: CategoryEntity` - Optional category object relation

- **ProviderCreateRequestDto**: Added optional `notes` field

- **UpdateRequestDto**: Added the following fields:
  - `notes?: string` - Optional notes field
  - `history?: CreateHistoryDto` - Optional history object for creating history records when updating requests

- **UpdateRequestForUserDto**: Added optional `history` field for creating history records

### 3. Notification Entity & DTOs

#### Updated Files:
- `src/app/common/entities/notification/notification.entity.ts`
- `src/app/common/dtos/notification/create-custom-notification.dto.ts`
- `src/app/common/dtos/notification/search-notification.dto.ts`

#### Changes:
- **NotificationType**: Changed from old types to new API-aligned types:
  - ❌ Removed: `'REVIEW'`, `'TASK'`, `'REQUEST'`, `'SUBSCRIPTION'`, `'PURCHASE_SERVICE'`, `'PURCHASE_PRODUCT'`, `'PURCHASE_PLAN'`
  - ✅ Added: `'CUSTOM'`, `'APPOINTMENT_CREATED'`, `'APPOINTMENT_UPDATED'`, `'REQUEST_CREATED'`, `'REQUEST_UPDATED'`

- **UserNotificationEntity**: Restructured to match swagger:
  - Changed from `{ full_name, phone, role, profile_image_id }`
  - To: `{ first_name, last_name, phone_number, country_code, gender, picture: MediaEntity }`
  - Changed date fields from `Date` to `string` type
  - Added `created_at` and `updated_at` fields

- **NotificationsEntity.meta**: Updated to include all pagination fields:
  - Added: `current_page`, `last_page`, `per_page`, `from`, `to`
  - Kept: `total`

- **UserRole**: Changed from old roles to new API-aligned roles:
  - ❌ Removed: `'SUPPORTED'`, `'SUPPORTER'`, `'SUPPLIER'`, `'CASE_MANAGER'`, `'SUPER_ADMIN'`
  - ✅ Updated to: `'USER'`, `'PROVIDER'`, `'ADMIN'`

### 4. UI Component Updates

#### Updated Files:
- `src/app/features/notification/pages/CreateNotificationPage.tsx`
- `src/app/components/notification-form/NotificationForm.tsx`
- `src/app/pages/notifications/Notifications.tsx`

#### Changes:
- Updated `NOTIFICATION_TYPES` arrays to use new notification types
- Updated `USER_ROLES` arrays to use new role values
- Updated `FALLBACK_TITLE` mappings for notification display

## Breaking Changes

⚠️ **Warning**: These changes introduce breaking changes for existing notification-related code:

1. Any code using old notification types (`REVIEW`, `TASK`, etc.) will need to be updated
2. Any code accessing `UserNotificationEntity.full_name` should now use `first_name` and `last_name`
3. Any code accessing `UserNotificationEntity.profile_image_id` should now use `picture` object
4. Date fields in Ads entity are now strings instead of Date objects

## Testing Recommendations

1. ✅ Test ads creation and display with date fields
2. ✅ Test request creation with `notes` field
3. ✅ Test request updates with `history` field
4. ✅ Test notification creation with new notification types
5. ✅ Verify notification display with new user entity structure
6. ✅ Test role-based notification targeting with new roles

## API Compatibility

These changes ensure the portal is fully compatible with the backend API as defined in `swagger.yaml`. All DTOs and entities now match the API specification exactly.

## Next Steps

- Update any existing data/mocks to use new notification types
- Update test cases to reflect new entity structures
- Consider adding migration scripts if there's existing data with old notification types
