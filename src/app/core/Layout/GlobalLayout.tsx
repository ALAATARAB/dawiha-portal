import { CssBaseline } from '@mui/material'
import { AppProvider } from '@toolpad/core/AppProvider'
import { NotificationsProvider } from '@toolpad/core/useNotifications'

import { layoutTheme } from './constant'
import MainRouter from '../routing/MainRouter'

const GlobalLayout = () => {
    return (
        <AppProvider theme={layoutTheme}>
            <CssBaseline />
            <NotificationsProvider>
                <MainRouter />
            </NotificationsProvider>
        </AppProvider>
    )
}

export default GlobalLayout
