import type { BaseQueryApi } from '@reduxjs/toolkit/query'

import { logOut } from '../../../features/auth/state/authSlice'

export const UnauthorizedException = (api: BaseQueryApi) => {
    api.dispatch(logOut())
    // window.location.replace('/login')
}
