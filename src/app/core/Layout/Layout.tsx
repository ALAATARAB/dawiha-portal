import type { TRoles } from '../../features/auth/state/@types'

import { AppProvider, type NavigationPageItem } from '@toolpad/core/AppProvider'
import {
    DashboardLayout,
    DashboardSidebarPageItem,
} from '@toolpad/core/DashboardLayout'
import { useDemoRouter } from '@toolpad/core/internal'
import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { getCurrentSession, layoutTheme } from './constant'
import Content from './Content/Content'
import { getSideBarItems } from './Sidebar/sidebarItems'
import { useLocalizedString } from '../../common/custom-hooks/useLocalizedString'
import { envConfig } from '../../common/env-config/env-config'
import { getWebDeviceId } from '../../common/utils/web-device-id'
import { useLogoutMutation } from '../../features/auth/api/authApiSlice'
import {
    logOut,
    selectCurrentApiRole,
    selectCurrentPermission,
} from '../../features/auth/state/authSlice'

const LayoutContainer = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const role: TRoles | null = useSelector(selectCurrentPermission)
    const apiRole = useSelector(selectCurrentApiRole)
    const [logoutRequest] = useLogoutMutation()
    const router = useDemoRouter('/')
    const projectTitle = useLocalizedString(envConfig.PROJECT_NAME)
    const authentication = React.useMemo(() => {
        return {
            signIn: () => { },
            signOut: async () => {
                try {
                    await logoutRequest({ device_id: getWebDeviceId() }).unwrap()
                } catch {
                    /* still clear local session */
                }
                dispatch(logOut())
                navigate('/login')
            },
        }
    }, [dispatch, logoutRequest, navigate])
    const renderPageItem = React.useCallback((item: NavigationPageItem) => {
        return (
            <div
                onClick={() => navigate(`/${item.segment}`)}
                style={{ marginBottom: '2px' }}
            >
                <DashboardSidebarPageItem item={item} />
            </div>
        )
    }, [])
    return (
        <AppProvider
            session={getCurrentSession()}
            navigation={getSideBarItems(role, apiRole)}
            router={router}
            authentication={authentication}
            theme={layoutTheme}
        >
            <DashboardLayout
                renderPageItem={renderPageItem}
                branding={{
                    logo: <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Dawiha Logo" style={{ height: '32px', width: '32px', display: 'block' }} />,
                    title: projectTitle,
                }}
                sidebarExpandedWidth={250}
            >
                <Content />
            </DashboardLayout>
        </AppProvider>
    )
}

export default LayoutContainer
