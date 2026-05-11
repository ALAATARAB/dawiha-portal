import type { TRoles } from '../../features/auth/state/@types'

import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getDefaultRoute } from './pagesItems'
import { selectCurrentPermission } from '../../features/auth/state/authSlice'

const DefaultRoute = () => {
    const navigate = useNavigate()
    const role: TRoles | null = useSelector(selectCurrentPermission)
    const navigateTo = getDefaultRoute(role)
    useEffect(() => {
        navigate(String(navigateTo))
    }, [])
    return (
        <div>
            <h1>redirecting...</h1>
        </div>
    )
}

export default DefaultRoute
