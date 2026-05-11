import { configureStore } from '@reduxjs/toolkit'

import { apiSlice } from './api/api-slice'
import appSettingsReducer from '../../features/app-setting/state/appSettingsSlice'
import authReducer from '../../features/auth/state/authSlice'

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authReducer,
        appSettings: appSettingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }).concat(
            apiSlice.middleware
        ),
    devTools: true,
})

export type AppRootState = ReturnType<typeof store.getState>
