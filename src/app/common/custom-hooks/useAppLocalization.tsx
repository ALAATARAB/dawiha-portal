import { useEffect } from 'react'
import { useSelector } from 'react-redux'

import i18n from '../../config/i18n'
import { selectLanguage } from '../../features/app-setting/state/appSettingsSlice'

export const useAppLocalization = () => {
    const language = useSelector(selectLanguage)

    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language)
        }
    }, [language])

    return { currentLanguage: language }
}
