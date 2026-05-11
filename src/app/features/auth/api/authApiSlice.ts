import type { LoginDTO } from '../../../common/dtos/auth/login.dto'
import type { AuthEntity } from '../../../common/entities/auth/auth.entity'
import type { MeEntity } from '../../../common/entities/auth/me.entity'

import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import {
    API_TAGS,
    API_SLICES_TAGS,
} from '../../../core/redux-store/api/tags.constant'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<AuthEntity, LoginDTO>({
            query: (data) => ({
                url: API_ENDPOINTS.AUTH.LOGIN,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: API_TAGS.filter((tag) => tag !== API_SLICES_TAGS.AUTH),
        }),
        getMe: builder.query<MeEntity, void>({
            query: () => ({
                url: API_ENDPOINTS.USER.ME,
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.AUTH],
        }),
        logout: builder.mutation<void, { device_id: string }>({
            query: (body) => ({
                url: API_ENDPOINTS.USER.LOGOUT,
                method: API_METHODS.POST,
                body,
            }),
            invalidatesTags: API_TAGS.filter((tag) => tag !== API_SLICES_TAGS.AUTH),
        }),
    }),
})

export const {
    useLoginMutation,
    useLogoutMutation,
    useGetMeQuery,
    useLazyGetMeQuery,
} = authApiSlice
