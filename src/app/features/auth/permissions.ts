import type { TRoles } from './state/@types'
import type { MeRole } from '../../common/entities/auth/me.entity'

/** Route group for React Router (`admin` = full portal shell). */
export function mapApiRoleToPortalPermission(role: MeRole | string): TRoles {
    const r = String(role).toUpperCase()
    if (r === 'PROVIDER' || r === 'SUPPORTED') {
        return 'user'
    }
    return 'admin'
}

/** Route segments gated to ops / finance roles (PRD). Empty while those modules are not in the shell. */
const OPS_SEGMENTS = new Set<string>([])

const FINANCE_SEGMENTS = new Set<string>([])

const opsRoles = new Set([
    'SUPER_ADMIN',
    'ADMIN',
    'CASE_MANAGER',
    'SUPPORTER',
])

const financeRoles = new Set([
    'SUPER_ADMIN',
    'ADMIN',
    'SUPPORTER',
    'SUPPLIER',
])

/** PRD-aligned module access. Extend as screens are built. */
export function canSeeSegment(apiRole: string | null, segment: string): boolean {
    if (!apiRole) return false
    const r = apiRole.toUpperCase()
    if (SUPER_ADMIN_LIKE.has(r)) {
        return true
    }
    if (OPS_SEGMENTS.has(segment) && !opsRoles.has(r)) {
        return false
    }
    if (FINANCE_SEGMENTS.has(segment) && !financeRoles.has(r)) {
        return false
    }
    return true
}

const SUPER_ADMIN_LIKE = new Set(['SUPER_ADMIN', 'ADMIN'])
