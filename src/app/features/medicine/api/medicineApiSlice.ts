import type { SearchMedicineDto } from '../../../common/dtos/medicine/search-medicine.dto'
import type { UpdateMedicineDto } from '../../../common/dtos/medicine/update-medicine.dto'
import type { MedicineEntity, MedicinesEntity } from '../../../common/entities/medicine/medicine.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const medicineApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMedicines: builder.query<MedicinesEntity, SearchMedicineDto>({
            query: (params) => ({
                url: API_ENDPOINTS.MEDICINE.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.MEDICINE],
        }),
        getMedicine: builder.query<MedicineEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.MEDICINE.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.MEDICINE],
        }),
        updateMedicine: builder.mutation<
            MedicineEntity,
            { id: number; data: UpdateMedicineDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.MEDICINE.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.MEDICINE],
        }),
        deleteMedicine: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.MEDICINE.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.MEDICINE],
        }),
    }),
})

export const {
    useGetMedicinesQuery,
    useLazyGetMedicinesQuery,
    useGetMedicineQuery,
    useLazyGetMedicineQuery,
    useUpdateMedicineMutation,
    useDeleteMedicineMutation,
} = medicineApiSlice
