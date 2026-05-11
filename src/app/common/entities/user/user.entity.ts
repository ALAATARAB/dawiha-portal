import { z } from 'zod'

import { paginatedResponseEntity } from '../common/paginated-response.entity'

export const userRoles = z.enum(['ADMIN', 'USER', 'PROVIDER'])
export type UserRoleEnum = z.infer<typeof userRoles>

export const userGender = z.enum(['MALE', 'FEMALE'])
export type UserGenderEnum = z.infer<typeof userGender>

/** Admin portal user row (`BaseActorEntity` from swagger). */
export const baseActorEntity = z.object({
    id: z.number(),
    full_name: z.string(),
    phone_number: z.string(),
    country_code: z.string(),
    birth_date: z.string().optional(),
    gender: userGender.optional(),
    is_verified: z.boolean(),
    role: userRoles,
    created_at: z.string(),
    updated_at: z.string(),
})

export type BaseActorEntity = z.infer<typeof baseActorEntity>

export const baseActorsEntity = paginatedResponseEntity(baseActorEntity)
export type BaseActorsEntity = z.infer<typeof baseActorsEntity>

/** Admin portal user entity (mapped from BaseActorEntity). */
export type AdminUserEntity = {
    id: number
    fullName: string
    phoneNumber: string
    countryCode: string
    birthDate?: string
    gender?: UserGenderEnum
    isVerified: boolean
    role: UserRoleEnum
    createdAt: string
    updatedAt: string
}

export type AdminUsersEntity = {
    data: AdminUserEntity[]
    totalCount: number
}

/** Maps API BaseActorEntity to AdminUserEntity. */
export function mapActorToAdminUser(row: Record<string, unknown>): AdminUserEntity {
    return {
        id: Number(row.id),
        fullName: String(row.full_name ?? ''),
        phoneNumber: String(row.phone_number ?? ''),
        countryCode: String(row.country_code ?? ''),
        birthDate: row.birth_date ? String(row.birth_date) : undefined,
        gender: row.gender ? (String(row.gender) as UserGenderEnum) : undefined,
        isVerified: Boolean(row.is_verified),
        role: String(row.role) as UserRoleEnum,
        createdAt: String(row.created_at ?? ''),
        updatedAt: String(row.updated_at ?? ''),
    }
}
