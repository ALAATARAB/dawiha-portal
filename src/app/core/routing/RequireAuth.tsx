import { useSelector } from 'react-redux'
import { useLocation, Navigate, Outlet } from 'react-router-dom'

import { selectCurrentToken } from '../../features/auth/state/authSlice'

interface RequireAuthProps {
    isRequired: boolean
}
const RequireAuth: React.FC<RequireAuthProps> = ({ isRequired = true }) => {
    const token = useSelector(selectCurrentToken)
    const location = useLocation()
    return isRequired ? (
        token ? (
            <Outlet />
        ) : (
            <Navigate to="/login" state={{ from: location }} replace />
        )
    ) : token ? (
        <Navigate to="/" state={{ from: location }} replace />
    ) : (
        <Outlet />
    )
}

export default RequireAuth
