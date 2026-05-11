import { type Navigation } from '@toolpad/core/AppProvider'

import { adminSidebar, userSidebar } from './sidebarConstant'
import { useLocalizedString } from '../../../common/custom-hooks/useLocalizedString'
import { canSeeSegment } from '../../../features/auth/permissions'
import { type TRoles } from '../../../features/auth/state/@types'

export const getSideBarItems = (
    role: TRoles | null,
    apiRole: string | null
): Navigation => {
    let sidebarItems: Navigation = []
    switch (role) {
        case 'admin':
            sidebarItems = adminSidebar
            break
        case 'user':
            sidebarItems = userSidebar
            break
        default:
            sidebarItems = adminSidebar
            break
    }
    return sidebarItems
        .filter((item: any) =>
            item.segment ? canSeeSegment(apiRole, String(item.segment)) : true
        )
        .map((item: any) => {
            return { ...item, title: useLocalizedString(item.title as string) }
        })
}
