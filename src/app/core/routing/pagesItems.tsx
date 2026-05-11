import { type RouteObject } from 'react-router-dom'

import DefaultRoute from './DefaultRoute'
import { adminRoutes, userRoutes } from './protected/ProtectedRoutes'
import { type TRoles } from '../../features/auth/state/@types'

export const getPages = (role: TRoles | null): RouteObject[] => {
    let pages: RouteObject[] = []
    switch (role) {
        case 'admin':
            pages = adminRoutes
            break
        case 'user':
            pages = userRoutes
            break
        default:
            pages = adminRoutes
            break
    }
    const doesNotHaveRootPath = !pages.some((route) => route.path === '/')
    if (doesNotHaveRootPath) {
        pages.push({ path: '/', element: <DefaultRoute /> })
    }
    return pages
}

export const getDefaultRoute = (role: TRoles | null): string => {
    let pages: RouteObject[] = []
    switch (role) {
        case 'admin':
            pages = adminRoutes
            break
        case 'user':
            pages = userRoutes
            break
        default:
            pages = adminRoutes
            break
    }
    return pages[0]?.path ?? '/users'
}
