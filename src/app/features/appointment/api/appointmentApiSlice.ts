import type { SearchAppointmentDto } from '../../../common/dtos/appointment/search-appointment.dto'
import type { UpdateAppointmentDto } from '../../../common/dtos/appointment/update-appointment.dto'
import type { AppointmentEntity, AppointmentsEntity } from '../../../common/entities/appointment/appointment.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const appointmentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAppointments: builder.query<AppointmentsEntity, SearchAppointmentDto>({
            query: (params) => ({
                url: API_ENDPOINTS.APPOINTMENT.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.APPOINTMENT],
        }),
        getAppointment: builder.query<AppointmentEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.APPOINTMENT.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.APPOINTMENT],
        }),
        updateAppointment: builder.mutation<
            AppointmentEntity,
            { id: number; data: UpdateAppointmentDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.APPOINTMENT.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.APPOINTMENT],
        }),
        deleteAppointment: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.APPOINTMENT.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.APPOINTMENT],
        }),
    }),
})

export const {
    useGetAppointmentsQuery,
    useLazyGetAppointmentsQuery,
    useGetAppointmentQuery,
    useLazyGetAppointmentQuery,
    useUpdateAppointmentMutation,
    useDeleteAppointmentMutation,
} = appointmentApiSlice
