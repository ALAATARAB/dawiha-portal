import type { SelectUserDto } from '../../../common/dtos/user/select-user.dto'
import type { AdminUsersEntity } from '../../../common/entities/user/user.entity'

import { mapActorToAdminUser } from '../../../common/entities/user/user.entity'
import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import { API_ENDPOINTS } from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

type BaseActorsResponse = {
    data: Record<string, unknown>[]
    meta: { total: number }
}

export const selectUserApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        selectUser: builder.query<AdminUsersEntity, SelectUserDto>({
            query: (selectUserDto) => ({
                url: API_ENDPOINTS.USER.SELECT,
                params: removeNullValues({
                    page: selectUserDto.page,
                    perPage: selectUserDto.perPage,
                    name: selectUserDto.name ?? undefined,
                }),
            }),
            transformResponse: (res: BaseActorsResponse): AdminUsersEntity => ({
                data: (res.data ?? []).map((row) =>
                    mapActorToAdminUser(row as Record<string, unknown>)
                ),
                totalCount: res.meta?.total ?? 0,
            }),
            providesTags: [API_SLICES_TAGS.SELECT_USER],
        }),
    }),
})

export const { useSelectUserQuery } = selectUserApiSlice
