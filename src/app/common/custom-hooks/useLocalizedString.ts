import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import { selectLanguage } from '../../features/app-setting/state/appSettingsSlice'

export const useLocalizedString = (
    key: string,
    options?: Record<string, any>
) => {
    const { i18n, t } = useTranslation()
    const language = useSelector(selectLanguage)
    const [translated, setTranslated] = useState('')

    useEffect(() => {
        if (i18n.language !== language) {
            i18n.changeLanguage(language)
        }
    }, [language, i18n])

    useEffect(() => {
        setTranslated(t(key, options))
    }, [key, language, t])

    return translated
}
