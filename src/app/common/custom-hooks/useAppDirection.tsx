import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import { selectLanguage } from '../../features/app-setting/state/appSettingsSlice'

export const useAppDirection = () => {
    const language = useSelector(selectLanguage)

    useEffect(() => {
        const dir = language === 'ar' ? 'rtl' : 'ltr'
        document.documentElement.setAttribute('dir', dir)
        document.body.dir = dir
    }, [language])
}
