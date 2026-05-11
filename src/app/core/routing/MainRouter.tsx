import type { TRoles } from '../../features/auth/state/@types'

import { useSelector } from 'react-redux'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

import { getPages } from './pagesItems'
import RequireAuth from './RequireAuth'
import SessionBootstrap from './SessionBootstrap'
import { useAppLocalization } from '../../common/custom-hooks/useAppLocalization'
import { selectCurrentPermission } from '../../features/auth/state/authSlice'
import LayoutContainer from '../Layout/Layout'
import { publicPages, appPages } from './public/PublicRoutes'
// import { useAppDirection } from '../../common/custom-hooks/useAppDirection'

const MainRouter = () => {
    useAppLocalization()
    // useAppDirection()
    const role: TRoles | null = useSelector(selectCurrentPermission)
    const protectedPages = getPages(role)
    return (
        <Router>
            <SessionBootstrap />
            <Routes>
                {appPages.map(({ path, element }, index) => (
                    <Route path={path} element={element} key={index} />
                ))}
                <Route element={<RequireAuth isRequired={false} />}>
                    {publicPages.map(({ path, element }, index) => (
                        <Route path={path} element={element} key={index} />
                    ))}
                </Route>
                <Route element={<RequireAuth isRequired={true} />}>
                    <Route element={<LayoutContainer />}>
                        {protectedPages.map(({ path, element }, index) => (
                            <Route path={path} element={element} key={index} />
                        ))}
                    </Route>
                </Route>
            </Routes>
        </Router>
    )
}

export default MainRouter
