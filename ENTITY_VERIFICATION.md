# Entity Verification Report

This document verifies that all entities match the swagger.yaml schema.

## ✅ Verified Entities

### 1. **AppointmentEntity** ✅
- All fields present: `id`, `provider_id`, `user_id`, `date`, `status`, `user_notes`, `provider_notes`, `created_at`, `updated_at`
- Status enum matches: WAITING_PROVIDER_APPROVAL, WAITING_CLIENT_APPROVAL, RESERVED, COMPLETED, CANCELLED_BY_PROVIDER, CANCELLED_BY_CLIENT

### 2. **CategoryEntity** ✅
- All fields present: `id`, `title`, `description`, `created_at`, `updated_at`

### 3. **HistoryEntity** ✅
- All fields present: `id`, `user_id`, `type`, `title`, `image_id`, `description`, `created_at`, `updated_at`
- Type enum matches: MEDICAL_RECORD, PREGNANCY_HISTORY, SURGERY_HISTORY, ALLERGY_HISTORY, MEDICATION_HISTORY, FAMILY_HISTORY

### 4. **MediaEntity** ✅ (FIXED)
- **FIXED**: Added missing `created_at` and `updated_at` fields
- All fields present: `id`, `title`, `description`, `url`, `type`, `purpose`, `width`, `height`, `size`, `duration`, `created_at`, `updated_at`
- Purpose enum matches: USER, MEDICINE

### 5. **MedicineEntity** ✅
- All fields present: `id`, `user_id`, `title`, `week_day`, `quantity`, `instructions`, `description`, `dates`, `created_at`, `updated_at`
- WeekDay enum matches: SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY

### 6. **MedicineGuideEntity** ✅
- All fields present: `id`, `title`, `description`, `uses`, `warnings`, `how_to_use`, `main_info`, `image_id`, `created_at`, `updated_at`

### 7. **PregnancyEntity** ✅
- All fields present: `id`, `user_id`, `status`, `start`, `created_at`, `updated_at`
- Status enum matches: ACTIVE, CANCELED, DONE

### 8. **PregnancyStageEntity** ✅
- All fields present: `id`, `title`, `week_number`, `description`, `medical_advice`, `image_id`, `created_at`, `updated_at`

### 9. **ProviderEntity** ✅
- All fields present: `id`, `user_id`, `phone_numbers`, `lat`, `lng`, `categories`, `title`, `type`, `about`, `booking_fees`, `image_id`, `description`, `created_at`, `updated_at`
- Type enum matches: DOCTOR, NURSE, CLINIC, HOSPITAL
- Includes NearestProvidersEntity with distance field

### 10. **ProviderAvailabilityEntity** ✅
- All fields present: `id`, `provider_id`, `work_day`, `from`, `to`, `created_at`, `updated_at`
- WorkDay enum matches: SUNDAY, MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY

### 11. **UserEntity (BaseActorEntity)** ✅
- All fields present: `id`, `full_name`, `phone_number`, `country_code`, `birth_date`, `gender`, `is_verified`, `role`, `created_at`, `updated_at`
- Role enum matches: ADMIN, USER, PROVIDER
- Gender enum matches: MALE, FEMALE

### 12. **MeEntity** ✅
- All fields present: `id`, `full_name`, `phone_number`, `country_code`, `birth_date`, `gender`, `fcm_token`, `is_verified`, `role`, `created_at`, `updated_at`

### 13. **RequestEntity** ✅ (CREATED)
- **CREATED**: New entity file created
- All fields present: `id`, `provider_id`, `user_id`, `category_id`, `title`, `status`, `created_at`, `updated_at`
- Status enum matches: PENDING, DONE, CANCELED
- DTOs created: ProviderCreateRequestDto, UpdateRequestDto, UpdateRequestForUserDto, SearchRequestDto

## Summary

- **Total Entities**: 13
- **Fixed**: 1 (MediaEntity - added created_at, updated_at)
- **Created**: 1 (RequestEntity - completely missing)
- **All entities now match swagger.yaml schema** ✅

## Files Created/Modified

### Created:
1. `src/app/common/entities/request/request.entity.ts`
2. `src/app/common/dtos/request/create-request.dto.ts`
3. `src/app/common/dtos/request/update-request.dto.ts`
4. `src/app/common/dtos/request/search-request.dto.ts`

### Modified:
1. `src/app/common/entities/media/media.entity.ts` - Added created_at and updated_at fields
