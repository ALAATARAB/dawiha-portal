import type { MeEntity } from '../../../../common/entities/auth/me.entity'

export type TRoles = 'user' | 'admin'

export type TAuthSliceState = {
    id: number | null
    permission: TRoles | null
    /** Raw API role from `MeEntity.role` (for sidebar rules). */
    apiRole: string | null
    token: string | null
    profile: MeEntity | null
}
