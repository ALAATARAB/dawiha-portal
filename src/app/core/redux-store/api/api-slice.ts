import { createApi } from '@reduxjs/toolkit/query/react'

import { API_TAGS } from './tags.constant'
import { baseQueryHandleExceptions } from '../../base-query/base-query-handle-exceptions'

export const apiSlice = createApi({
    baseQuery: baseQueryHandleExceptions,
    tagTypes: [...API_TAGS],
    endpoints: () => ({}),
})
