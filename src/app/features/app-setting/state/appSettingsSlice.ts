import type { AppSettings, Theme, Language } from './@types'
import type { AppRootState } from '../../../core/redux-store/store'
import type { PayloadAction } from '@reduxjs/toolkit'

import { createSlice } from '@reduxjs/toolkit'

let initialState: AppSettings = {
    theme: 'default',
    language: 'en',
}

if (localStorage.getItem('settings') !== null) {
    initialState = {
        ...(JSON.parse(
            localStorage.getItem('settings') || '{}'
        ) as AppSettings),
    }
}
const appSettingsSlice = createSlice({
    name: 'appSettings',
    initialState,
    reducers: {
        setTheme: (state, action: PayloadAction<Theme>) => {
            state.theme = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
        },
        setLanguage: (state, action: PayloadAction<Language>) => {
            state.language = action.payload
            localStorage.setItem('settings', JSON.stringify(state))
        },
    },
})

export const { setTheme, setLanguage } = appSettingsSlice.actions
export default appSettingsSlice.reducer

// selectors
export const selectTheme = (state: AppRootState) => state.appSettings.theme
export const selectLanguage = (state: AppRootState) =>
    state.appSettings.language
