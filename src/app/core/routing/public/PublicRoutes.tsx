import type { RouteObject } from 'react-router-dom'

import LoginPage from '../../../pages/login/Login'
import NotFound from '../../../pages/system/not-found/NotFound'

export const publicPages: RouteObject[] = [
    {
        path: '/login',
        element: <LoginPage />,
    },
]
export const appPages: RouteObject[] = [
    {
        path: '*',
        element: <NotFound />,
    },
]
