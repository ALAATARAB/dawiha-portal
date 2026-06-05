import type { SearchNotificationDto } from '../../../common/dtos/notification/search-notification.dto'
import type { CreateCustomNotificationDto } from '../../../common/dtos/notification/create-custom-notification.dto'
import type { NotificationEntity, NotificationsEntity } from '../../../common/entities/notification/notification.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const notificationApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getNotifications: builder.query<NotificationsEntity, SearchNotificationDto>({
            query: (params) => {
                // Filter out undefined values to avoid sending them
                const cleanParams = Object.fromEntries(
                    Object.entries(params).filter(([_, v]) => v !== undefined && v !== null && v !== '')
                )
                return {
                    url: API_ENDPOINTS.NOTIFICATION.GET_LIST,
                    method: API_METHODS.GET,
                    params: cleanParams,
                }
            },
            providesTags: [API_SLICES_TAGS.NOTIFICATION],
        }),
        createCustomNotification: builder.mutation<{ message: string }, CreateCustomNotificationDto>({
            query: (data) => ({
                url: API_ENDPOINTS.NOTIFICATION.CREATE_CUSTOM,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.NOTIFICATION],
        }),
        markNotificationAsRead: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: API_ENDPOINTS.NOTIFICATION.MARK_READ(id),
                method: API_METHODS.PATCH,
            }),
            invalidatesTags: [API_SLICES_TAGS.NOTIFICATION],
        }),
        deleteNotification: builder.mutation<{ message: string }, number>({
            query: (id) => ({
                url: API_ENDPOINTS.NOTIFICATION.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.NOTIFICATION],
        }),
    }),
})

export const {
    useGetNotificationsQuery,
    useLazyGetNotificationsQuery,
    useCreateCustomNotificationMutation,
    useMarkNotificationAsReadMutation,
    useDeleteNotificationMutation,
} = notificationApiSlice
