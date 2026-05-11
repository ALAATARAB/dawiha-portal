import type { BaseQueryApi } from '@reduxjs/toolkit/query'

import { baseQuery } from './base-query'
import { NOT_FOUND_API_MESSAGES } from './exceptions/constant'
import { UnauthorizedException } from './exceptions/unauthorized.exception'
// TODO: serialize request or show toast error
export const baseQueryHandleExceptions = async (
    args: any,
    api: BaseQueryApi,
    extraOptions: {}
) => {
    const result: any = await baseQuery(args, api, extraOptions)
    if (result?.error?.status === 401) {
        UnauthorizedException(api)
    } else if (result?.error?.status === 404) {
        if (NOT_FOUND_API_MESSAGES.includes(result?.error?.data?.message)) {
            window.location.replace('/404')
        }
    }
    //  else if (result?.error?.status === 500) {
    // }
    return result
}
