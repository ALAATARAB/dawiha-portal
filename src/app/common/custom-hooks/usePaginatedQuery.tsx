import { useSearchParams } from 'react-router-dom'

type PaginationParams = { page: number; perPage: number }

export function usePaginatedQuery<
    TData,
    TQueryParams extends Record<string, any> = {},
>(
    queryHook: (params: PaginationParams & TQueryParams) => any,
    queryParams?: TQueryParams
): {
    data: TData
    isLoading: boolean
    isFetching: boolean
    page: number
    perPage: number
    refetch: () => Promise<unknown>
} {
    const [searchParams] = useSearchParams()

    const page = Number(searchParams.get('page')) || 1
    const perPage = Number(searchParams.get('perPage')) || 10

    const finalParams = {
        page,
        perPage,
        ...(queryParams || {}),
    } as PaginationParams & TQueryParams

    const { data, isFetching, isLoading, refetch } = queryHook(finalParams) as {
        data: TData
        isLoading: boolean
        isFetching: boolean
        refetch: () => Promise<unknown>
    }

    return { data, isFetching, isLoading, page, perPage, refetch }
}
