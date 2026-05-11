import type { CreateMedicineGuideDto } from '../../../common/dtos/medicine-guide/create-medicine-guide.dto'
import type { SearchMedicineGuideDto } from '../../../common/dtos/medicine-guide/search-medicine-guide.dto'
import type { UpdateMedicineGuideDto } from '../../../common/dtos/medicine-guide/update-medicine-guide.dto'
import type { MedicineGuideEntity, MedicineGuidesEntity } from '../../../common/entities/medicine-guide/medicine-guide.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const medicineGuideApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getMedicineGuides: builder.query<MedicineGuidesEntity, SearchMedicineGuideDto>({
            query: (params) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.MEDICINE_GUIDE],
        }),
        getMedicineGuide: builder.query<MedicineGuideEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.MEDICINE_GUIDE],
        }),
        createMedicineGuide: builder.mutation<MedicineGuideEntity, CreateMedicineGuideDto>({
            query: (data) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.CREATE,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.MEDICINE_GUIDE],
        }),
        updateMedicineGuide: builder.mutation<
            MedicineGuideEntity,
            { id: number; data: UpdateMedicineGuideDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.MEDICINE_GUIDE],
        }),
        deleteMedicineGuide: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.MEDICINE_GUIDE],
        }),
        // Public endpoint for selection/autocomplete
        getMedicineGuidesSelect: builder.query<MedicineGuidesEntity, SearchMedicineGuideDto>({
            query: (params) => ({
                url: API_ENDPOINTS.MEDICINE_GUIDE.SELECT,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.SELECT_MEDICINE_GUIDE],
        }),
    }),
})

export const {
    useGetMedicineGuidesQuery,
    useLazyGetMedicineGuidesQuery,
    useGetMedicineGuideQuery,
    useLazyGetMedicineGuideQuery,
    useCreateMedicineGuideMutation,
    useUpdateMedicineGuideMutation,
    useDeleteMedicineGuideMutation,
    useGetMedicineGuidesSelectQuery,
    useLazyGetMedicineGuidesSelectQuery,
} = medicineGuideApiSlice
