import { apiSlice } from '../../../core/redux-store/api/api-slice'
import {
    API_ENDPOINTS,
} from '../../../core/redux-store/api/api.constants'
import { API_SLICES_TAGS } from '../../../core/redux-store/api/tags.constant'

export interface DashboardCounts {
    totalUsers: number
    totalProviders: number
    totalBookings: number
}

export interface DailyActivityPoint {
    date: string
    count: number
}

export interface DailyActivityResponse {
    data: DailyActivityPoint[]
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardCounts: builder.query<DashboardCounts, void>({
            query: () => ({
                url: API_ENDPOINTS.DASHBOARD.GET_COUNTS,
            }),
            providesTags: [API_SLICES_TAGS.DASHBOARD],
        }),
        getDailyActivity: builder.query<
            DailyActivityResponse,
            { startDate: string; endDate: string }
        >({
            query: ({ startDate, endDate }) => ({
                url: API_ENDPOINTS.DASHBOARD.GET_DAILY_ACTIVITY,
                params: { startDate, endDate },
            }),
            providesTags: [API_SLICES_TAGS.DASHBOARD],
        }),
    }),
})

export const {
    useGetDashboardCountsQuery,
    useGetDailyActivityQuery,
    useLazyGetDailyActivityQuery,
} = dashboardApiSlice
