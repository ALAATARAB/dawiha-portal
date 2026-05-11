#!/bin/bash

# Script to generate all entity and DTO files for dawiha-portal
# Based on dawiha-server swagger.yaml

set -e

BASE_DIR="src/app/common"

echo "Generating entities and DTOs for dawiha-portal..."

# Create directories
mkdir -p "$BASE_DIR/entities/provider"
mkdir -p "$BASE_DIR/entities/history"
mkdir -p "$BASE_DIR/entities/medicine"
mkdir -p "$BASE_DIR/entities/medicine-guide"
mkdir -p "$BASE_DIR/entities/pregnancy"
mkdir -p "$BASE_DIR/entities/pregnancy-stage"
mkdir -p "$BASE_DIR/entities/provider-availability"
mkdir -p "$BASE_DIR/entities/media"

mkdir -p "$BASE_DIR/dtos/provider"
mkdir -p "$BASE_DIR/dtos/history"
mkdir -p "$BASE_DIR/dtos/medicine"
mkdir -p "$BASE_DIR/dtos/medicine-guide"
mkdir -p "$BASE_DIR/dtos/pregnancy"
mkdir -p "$BASE_DIR/dtos/pregnancy-stage"
mkdir -p "$BASE_DIR/dtos/provider-availability"
mkdir -p "$BASE_DIR/dtos/user"

echo "✓ Directories created"

# Provider Entity
cat > "$BASE_DIR/entities/provider/provider.entity.ts" << 'EOF'
/**
 * Provider entities based on dawiha-server swagger.yaml
 */

export type ProviderType = 'DOCTOR' | 'NURSE' | 'CLINIC' | 'HOSPITAL'

export interface ProviderEntity {
    id: number
    user_id: number
    type: ProviderType
    title: string
    description?: string
    address?: string
    lat?: number
    lng?: number
    phone_number?: string
    categories?: Array<{
        id: number
        title: string
    }>
    user?: {
        id: number
        full_name: string
        phone_number: string
        country_code: string
    }
    created_at: string
    updated_at: string
}

export interface ProvidersEntity {
    data: ProviderEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}

export interface NearestProvidersEntity extends ProvidersEntity {
    data: Array<ProviderEntity & { distance?: number }>
}
EOF

# Provider DTOs
cat > "$BASE_DIR/dtos/provider/create-provider.dto.ts" << 'EOF'
import type { ProviderType } from '../../entities/provider/provider.entity'

export interface CreateProviderDto {
    type: ProviderType
    title: string
    description?: string
    address?: string
    lat?: number
    lng?: number
    phone_number?: string
    category_ids?: number[]
}
EOF

cat > "$BASE_DIR/dtos/provider/update-provider.dto.ts" << 'EOF'
import type { ProviderType } from '../../entities/provider/provider.entity'

export interface UpdateProviderDto {
    type?: ProviderType
    title?: string
    description?: string
    address?: string
    lat?: number
    lng?: number
    phone_number?: string
    category_ids?: number[]
}
EOF

cat > "$BASE_DIR/dtos/provider/search-provider.dto.ts" << 'EOF'
import type { ProviderType } from '../../entities/provider/provider.entity'

export interface SearchProviderDto {
    page?: number
    perPage?: number
    search?: string
    type?: ProviderType
}
EOF

# History Entity
cat > "$BASE_DIR/entities/history/history.entity.ts" << 'EOF'
/**
 * History entities based on dawiha-server swagger.yaml
 */

export type HistoryType =
    | 'MEDICAL_RECORD'
    | 'PREGNANCY_HISTORY'
    | 'SURGERY_HISTORY'
    | 'ALLERGY_HISTORY'
    | 'MEDICATION_HISTORY'
    | 'FAMILY_HISTORY'

export interface HistoryEntity {
    id: number
    user_id: number
    type: HistoryType
    title: string
    description?: string
    date?: string
    created_at: string
    updated_at: string
}

export interface HistoriesEntity {
    data: HistoryEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# History DTOs
cat > "$BASE_DIR/dtos/history/create-history.dto.ts" << 'EOF'
import type { HistoryType } from '../../entities/history/history.entity'

export interface CreateHistoryDto {
    user_id: number
    type: HistoryType
    title: string
    description?: string
    date?: string
}
EOF

cat > "$BASE_DIR/dtos/history/update-history.dto.ts" << 'EOF'
import type { HistoryType } from '../../entities/history/history.entity'

export interface UpdateHistoryDto {
    type?: HistoryType
    title?: string
    description?: string
    date?: string
}
EOF

cat > "$BASE_DIR/dtos/history/search-history.dto.ts" << 'EOF'
import type { HistoryType } from '../../entities/history/history.entity'

export interface SearchHistoryDto {
    page?: number
    perPage?: number
    search?: string
    user_id?: number
    type?: HistoryType
}
EOF

# Medicine Entity
cat > "$BASE_DIR/entities/medicine/medicine.entity.ts" << 'EOF'
/**
 * Medicine entities based on dawiha-server swagger.yaml
 */

export type WeekDay =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'

export interface MedicineEntity {
    id: number
    user_id: number
    title: string
    description?: string
    dosage?: string
    frequency?: string
    start_date?: string
    end_date?: string
    week_days?: WeekDay[]
    times?: string[]
    media_id?: number
    media?: {
        id: number
        url: string
        title?: string
    }
    created_at: string
    updated_at: string
}

export interface MedicinesEntity {
    data: MedicineEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# Medicine DTOs
cat > "$BASE_DIR/dtos/medicine/create-medicine.dto.ts" << 'EOF'
import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface CreateMedicineDto {
    title: string
    description?: string
    dosage?: string
    frequency?: string
    start_date?: string
    end_date?: string
    week_days?: WeekDay[]
    times?: string[]
    media_id?: number
}
EOF

cat > "$BASE_DIR/dtos/medicine/update-medicine.dto.ts" << 'EOF'
import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface UpdateMedicineDto {
    title?: string
    description?: string
    dosage?: string
    frequency?: string
    start_date?: string
    end_date?: string
    week_days?: WeekDay[]
    times?: string[]
    media_id?: number
}
EOF

cat > "$BASE_DIR/dtos/medicine/search-medicine.dto.ts" << 'EOF'
import type { WeekDay } from '../../entities/medicine/medicine.entity'

export interface SearchMedicineDto {
    page?: number
    perPage?: number
    search?: string
    user_id?: number
    week_day?: WeekDay
}
EOF

# Medicine Guide Entity
cat > "$BASE_DIR/entities/medicine-guide/medicine-guide.entity.ts" << 'EOF'
/**
 * Medicine Guide entities based on dawiha-server swagger.yaml
 */

export interface MedicineGuideEntity {
    id: number
    title: string
    description?: string
    usage_instructions?: string
    side_effects?: string
    warnings?: string
    created_at: string
    updated_at: string
}

export interface MedicineGuidesEntity {
    data: MedicineGuideEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# Medicine Guide DTOs
cat > "$BASE_DIR/dtos/medicine-guide/create-medicine-guide.dto.ts" << 'EOF'
export interface CreateMedicineGuideDto {
    title: string
    description?: string
    usage_instructions?: string
    side_effects?: string
    warnings?: string
}
EOF

cat > "$BASE_DIR/dtos/medicine-guide/update-medicine-guide.dto.ts" << 'EOF'
export interface UpdateMedicineGuideDto {
    title?: string
    description?: string
    usage_instructions?: string
    side_effects?: string
    warnings?: string
}
EOF

cat > "$BASE_DIR/dtos/medicine-guide/search-medicine-guide.dto.ts" << 'EOF'
export interface SearchMedicineGuideDto {
    page?: number
    perPage?: number
    search?: string
}
EOF

# Pregnancy Entity
cat > "$BASE_DIR/entities/pregnancy/pregnancy.entity.ts" << 'EOF'
/**
 * Pregnancy entities based on dawiha-server swagger.yaml
 */

export type PregnancyStatus = 'ACTIVE' | 'CANCELED' | 'DONE'

export interface PregnancyEntity {
    id: number
    user_id: number
    start_date: string
    expected_due_date?: string
    status: PregnancyStatus
    notes?: string
    current_week?: number
    created_at: string
    updated_at: string
}

export interface PregnanciesEntity {
    data: PregnancyEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# Pregnancy DTOs
cat > "$BASE_DIR/dtos/pregnancy/create-pregnancy.dto.ts" << 'EOF'
import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface CreatePregnancyDto {
    user_id: number
    start_date: string
    expected_due_date?: string
    status: PregnancyStatus
    notes?: string
}
EOF

cat > "$BASE_DIR/dtos/pregnancy/update-pregnancy.dto.ts" << 'EOF'
import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface UpdatePregnancyDto {
    start_date?: string
    expected_due_date?: string
    status?: PregnancyStatus
    notes?: string
}
EOF

cat > "$BASE_DIR/dtos/pregnancy/search-pregnancy.dto.ts" << 'EOF'
import type { PregnancyStatus } from '../../entities/pregnancy/pregnancy.entity'

export interface SearchPregnancyDto {
    page?: number
    perPage?: number
    user_id?: number
    status?: PregnancyStatus
    start_from?: string
    start_to?: string
}
EOF

# Pregnancy Stage Entity
cat > "$BASE_DIR/entities/pregnancy-stage/pregnancy-stage.entity.ts" << 'EOF'
/**
 * Pregnancy Stage entities based on dawiha-server swagger.yaml
 */

export interface PregnancyStageEntity {
    id: number
    week_number: number
    title: string
    description?: string
    baby_development?: string
    mother_changes?: string
    tips?: string
    created_at: string
    updated_at: string
}

export interface PregnancyStagesEntity {
    data: PregnancyStageEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# Pregnancy Stage DTOs
cat > "$BASE_DIR/dtos/pregnancy-stage/create-pregnancy-stage.dto.ts" << 'EOF'
export interface CreatePregnancyStageDto {
    week_number: number
    title: string
    description?: string
    baby_development?: string
    mother_changes?: string
    tips?: string
}
EOF

cat > "$BASE_DIR/dtos/pregnancy-stage/update-pregnancy-stage.dto.ts" << 'EOF'
export interface UpdatePregnancyStageDto {
    week_number?: number
    title?: string
    description?: string
    baby_development?: string
    mother_changes?: string
    tips?: string
}
EOF

cat > "$BASE_DIR/dtos/pregnancy-stage/search-pregnancy-stage.dto.ts" << 'EOF'
export interface SearchPregnancyStageDto {
    page?: number
    perPage?: number
    search?: string
    week_number?: number
}
EOF

# Provider Availability Entity
cat > "$BASE_DIR/entities/provider-availability/provider-availability.entity.ts" << 'EOF'
/**
 * Provider Availability entities based on dawiha-server swagger.yaml
 */

export type WorkDay =
    | 'SUNDAY'
    | 'MONDAY'
    | 'TUESDAY'
    | 'WEDNESDAY'
    | 'THURSDAY'
    | 'FRIDAY'
    | 'SATURDAY'

export interface ProviderAvailabilityEntity {
    id: number
    provider_id: number
    work_day: WorkDay
    start_time: string
    end_time: string
    is_available: boolean
    created_at: string
    updated_at: string
}

export interface ProviderAvailabilitiesEntity {
    data: ProviderAvailabilityEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# Provider Availability DTOs
cat > "$BASE_DIR/dtos/provider-availability/create-provider-availability.dto.ts" << 'EOF'
import type { WorkDay } from '../../entities/provider-availability/provider-availability.entity'

export interface CreateProviderAvailabilityDto {
    provider_id: number
    work_day: WorkDay
    start_time: string
    end_time: string
    is_available: boolean
}
EOF

cat > "$BASE_DIR/dtos/provider-availability/update-provider-availability.dto.ts" << 'EOF'
import type { WorkDay } from '../../entities/provider-availability/provider-availability.entity'

export interface UpdateProviderAvailabilityDto {
    work_day?: WorkDay
    start_time?: string
    end_time?: string
    is_available?: boolean
}
EOF

cat > "$BASE_DIR/dtos/provider-availability/search-provider-availability.dto.ts" << 'EOF'
import type { WorkDay } from '../../entities/provider-availability/provider-availability.entity'

export interface SearchProviderAvailabilityDto {
    page?: number
    perPage?: number
    provider_id?: number
    work_day?: WorkDay
}
EOF

# Media Entity
cat > "$BASE_DIR/entities/media/media.entity.ts" << 'EOF'
/**
 * Media entities based on dawiha-server swagger.yaml
 */

export type MediaPurpose = 'USER' | 'MEDICINE'

export interface MediaEntity {
    id: number
    title: string
    description?: string
    url: string
    type: string
    purpose: MediaPurpose
    width?: number
    height?: number
    size?: number
    duration?: number
}

export interface MediasEntity {
    data: MediaEntity[]
    meta: {
        current_page: number
        last_page: number
        per_page: number
        from: number
        to: number
        total: number
    }
}
EOF

# User DTOs
cat > "$BASE_DIR/dtos/user/update-user.dto.ts" << 'EOF'
export interface UpdateUserDto {
    full_name?: string
    fcm_token?: string
    birth_date?: string
    gender?: 'MALE' | 'FEMALE'
    role?: 'USER' | 'PROVIDER' | 'ADMIN'
    is_verified?: boolean
    phone_number?: string
    country_code?: string
}
EOF

cat > "$BASE_DIR/dtos/user/search-user.dto.ts" << 'EOF'
export interface SearchUserDto {
    page?: number
    perPage?: number
    role?: Array<'USER' | 'PROVIDER' | 'ADMIN'>
    gender?: 'MALE' | 'FEMALE'
    name?: string
    phone_number?: string
    country_code?: string
    created_at_from?: string
    created_at_to?: string
}
EOF

echo "✓ All entities and DTOs generated successfully!"
echo ""
echo "Generated files:"
echo "  - Provider (entity + 3 DTOs)"
echo "  - History (entity + 3 DTOs)"
echo "  - Medicine (entity + 3 DTOs)"
echo "  - Medicine Guide (entity + 3 DTOs)"
echo "  - Pregnancy (entity + 3 DTOs)"
echo "  - Pregnancy Stage (entity + 3 DTOs)"
echo "  - Provider Availability (entity + 3 DTOs)"
echo "  - Media (entity)"
echo "  - User (2 DTOs)"
echo ""
echo "Next steps:"
echo "  1. Run: chmod +x generate-entities.sh"
echo "  2. Run: ./generate-entities.sh"
echo "  3. Create API slices for each resource"
echo "  4. Create page components"
echo "  5. Update routing"
