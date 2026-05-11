import type { SearchUserDto } from '../../../common/dtos/user/search-user.dto'
import type { AdminUserEntity, AdminUsersEntity } from '../../../common/entities/user/user.entity'

import { mapActorToAdminUser } from '../../../common/entities/user/user.entity'
import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import { API_ENDPOINTS } from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

type BaseActorsResponse = {
    data: Record<string, unknown>[]
    meta: { total: number }
}

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUsers: builder.query<AdminUsersEntity, SearchUserDto>({
            query: (searchUserDto) => ({
                url: API_ENDPOINTS.USER.GET_LIST,
                params: removeNullValues({
                    page: searchUserDto.page,
                    perPage: searchUserDto.perPage,
                    name: searchUserDto.name,
                    role: searchUserDto.role,
                    // status: searchUserDto.status, // Not in new API
                    // email: searchUserDto.email, // Not in new API
                    phone_number: searchUserDto.phone_number,
                    // username: searchUserDto.username, // Not in new API
                    gender: searchUserDto.gender,
                    country_code: searchUserDto.country_code,
                    created_at_from: searchUserDto.created_at_from,
                    created_at_to: searchUserDto.created_at_to,
                }),
            }),
            transformResponse: (res: BaseActorsResponse): AdminUsersEntity => ({
                data: (res.data ?? []).map((row) =>
                    mapActorToAdminUser(row as Record<string, unknown>)
                ),
                totalCount: res.meta?.total ?? 0,
            }),
            providesTags: [API_SLICES_TAGS.USER],
        }),
        getOneUser: builder.query<AdminUserEntity, number | string>({
            async queryFn(id, _api, _extraOptions, fetchWithBQ) {
                const res = await fetchWithBQ({
                    url: API_ENDPOINTS.USER.GET_LIST,
                    params: {
                        page: 1,
                        perPage: 100,
                    },
                })
                if (res.error) {
                    return { error: res.error }
                }
                const body = res.data as BaseActorsResponse
                const row = body.data?.find(
                    (u: Record<string, unknown>) => Number(u.id) === Number(id)
                )
                if (!row) {
                    return {
                        error: {
                            status: 404,
                            data: { message: 'User not found' },
                        },
                    }
                }
                return {
                    data: mapActorToAdminUser(row as Record<string, unknown>),
                }
            },
            providesTags: [API_SLICES_TAGS.USER],
        }),
    }),
})

export const { useGetUsersQuery, useGetOneUserQuery } = userApiSlice
