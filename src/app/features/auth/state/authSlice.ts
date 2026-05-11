import type { TAuthSliceState } from './@types'
import type { MeEntity, FullAuthenticationEntity } from '../../../common/entities/auth/me.entity'
import type { AppRootState } from '../../../core/redux-store/store'

import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

import { mapApiRoleToPortalPermission } from '../permissions'

const AUTH_STORAGE_KEY = 'dawiha-admin-auth'

type TPersistedAuth = Pick<
    TAuthSliceState,
    'id' | 'permission' | 'token' | 'apiRole'
>

let intiState: TAuthSliceState = {
    id: null,
    permission: null,
    apiRole: null,
    token: null,
    profile: null,
}

// Initialize state from localStorage
try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY)
    if (raw) {
        const parsed = JSON.parse(raw) as Partial<TPersistedAuth>
        intiState = {
            ...intiState,
            id: parsed.id ?? null,
            permission: parsed.permission ?? null,
            apiRole: parsed.apiRole ?? null,
            token: parsed.token ?? null,
        }
    }
} catch {
    localStorage.removeItem(AUTH_STORAGE_KEY)
}

const authSlice = createSlice({
    name: 'auth',
    initialState: intiState,
    reducers: {
        setCredentials: (
            state,
            action: PayloadAction<FullAuthenticationEntity>
        ) => {
            const { user, accessToken } = action.payload
            const token = accessToken ?? ''
            const next: TPersistedAuth = {
                token,
                id: user.id,
                permission: mapApiRoleToPortalPermission(user.role),
                apiRole: user.role,
            }
            state.id = next.id
            state.permission = next.permission
            state.apiRole = next.apiRole
            state.token = next.token
            state.profile = user
            // Store in localStorage for persistence across page refreshes
            localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(next))
        },
        setProfile: (state, action: PayloadAction<MeEntity>) => {
            state.profile = action.payload
            state.apiRole = action.payload.role
            state.permission = mapApiRoleToPortalPermission(action.payload.role)
            state.id = action.payload.id
        },
        logOut: (state) => {
            state.id = null
            state.permission = null
            state.apiRole = null
            state.token = null
            state.profile = null
            // Clear from localStorage
            localStorage.removeItem(AUTH_STORAGE_KEY)
        },
    },
})

export const { setCredentials, setProfile, logOut } = authSlice.actions
export default authSlice.reducer

export const selectCurrentId = (state: AppRootState) => state.auth.id
export const selectCurrentPermission = (state: AppRootState) =>
    state.auth.permission
export const selectCurrentApiRole = (state: AppRootState) =>
    state.auth.apiRole
export const selectCurrentToken = (state: AppRootState) => state.auth.token
export const selectCurrentProfile = (state: AppRootState) =>
    state.auth.profile
