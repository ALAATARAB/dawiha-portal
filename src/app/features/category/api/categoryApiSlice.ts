import type { CreateCategoryDto } from '../../../common/dtos/category/create-category.dto'
import type { SearchCategoryDto } from '../../../common/dtos/category/search-category.dto'
import type { UpdateCategoryDto } from '../../../common/dtos/category/update-category.dto'
import type { CategoryEntity, CategoriesEntity } from '../../../common/entities/category/category.entity'

import { removeNullValues } from '../../../common/utils/remove-null-values'
import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
    API_METHODS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCategories: builder.query<CategoriesEntity, SearchCategoryDto>({
            query: (params) => ({
                url: API_ENDPOINTS.CATEGORY.GET_LIST,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.CATEGORY],
        }),
        getCategory: builder.query<CategoryEntity, number>({
            query: (id) => ({
                url: API_ENDPOINTS.CATEGORY.GET_ONE(id),
                method: API_METHODS.GET,
            }),
            providesTags: [API_SLICES_TAGS.CATEGORY],
        }),
        createCategory: builder.mutation<CategoryEntity, CreateCategoryDto>({
            query: (data) => ({
                url: API_ENDPOINTS.CATEGORY.CREATE,
                method: API_METHODS.POST,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.CATEGORY],
        }),
        updateCategory: builder.mutation<
            CategoryEntity,
            { id: number; data: UpdateCategoryDto }
        >({
            query: ({ id, data }) => ({
                url: API_ENDPOINTS.CATEGORY.UPDATE(id),
                method: API_METHODS.PATCH,
                body: data,
            }),
            invalidatesTags: [API_SLICES_TAGS.CATEGORY],
        }),
        deleteCategory: builder.mutation<void, number>({
            query: (id) => ({
                url: API_ENDPOINTS.CATEGORY.DELETE(id),
                method: API_METHODS.DELETE,
            }),
            invalidatesTags: [API_SLICES_TAGS.CATEGORY],
        }),
        // Public endpoint for selection/autocomplete
        getCategoriesSelect: builder.query<CategoriesEntity, SearchCategoryDto>({
            query: (params) => ({
                url: API_ENDPOINTS.CATEGORY.SELECT,
                method: API_METHODS.GET,
                params: removeNullValues(params),
            }),
            providesTags: [API_SLICES_TAGS.SELECT_CATEGORY],
        }),
    }),
})

export const {
    useGetCategoriesQuery,
    useLazyGetCategoriesQuery,
    useGetCategoryQuery,
    useLazyGetCategoryQuery,
    useCreateCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation,
    useGetCategoriesSelectQuery,
    useLazyGetCategoriesSelectQuery,
} = categoryApiSlice
