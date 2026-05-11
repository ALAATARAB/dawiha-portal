import { useNotifications } from '@toolpad/core/useNotifications'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { NOTIFICATIONS_PAGE_TITLE, notificationColumns } from './constant'
import { type NotificationListItem } from './types'
import { type NotificationType } from '../../common/dtos/notification/create-custom-notification.dto'
import { notificationService } from '../../common/services/notification.service'
import CrudTemplate from '../../components/crud-template/CrudTemplate'
import { SimpleSearch } from '../../components/simple-search/SimpleSearch'

const FALLBACK_TITLE: Record<NotificationType, string> = {
    REVIEW: 'Review notification',
    TASK: 'Task notification',
    REQUEST: 'Request notification',
    SUBSCRIPTION: 'Subscription notification',
    PURCHASE_SERVICE: 'Purchased service notification',
    PURCHASE_PRODUCT: 'Purchased product notification',
    PURCHASE_PLAN: 'Purchased plan notification',
    CUSTOM: 'Custom notification',
}

const toObject = (value: unknown): Record<string, unknown> =>
    value && typeof value === 'object' && !Array.isArray(value)
        ? (value as Record<string, unknown>)
        : {}

const toText = (value: unknown): string =>
    typeof value === 'string' ? value : ''

export default function Notifications() {
    const navigate = useNavigate()
    const toast = useNotifications()
    const [searchParams] = useSearchParams()
    const [rows, setRows] = useState<NotificationListItem[]>([])
    const [isLoading, setIsLoading] = useState(false)

    const loadNotifications = async () => {
        try {
            setIsLoading(true)
            const response = await notificationService.getNotifications({
                page: 1,
                perPage: 100,
            })
            const mappedRows: NotificationListItem[] = response.data.map((row) => {
                const payload = toObject(row.payload)
                const title = toText(payload.title) || FALLBACK_TITLE[row.type]
                const message =
                    toText(payload.body) ||
                    (Object.keys(payload).length > 0
                        ? JSON.stringify(payload)
                        : '—')
                const firstName = toText(row.receiver?.first_name)
                const lastName = toText(row.receiver?.last_name)
                const receiverName =
                    `${firstName} ${lastName}`.trim() ||
                    (row.receiver?.id ? `User #${row.receiver.id}` : 'Global')

                return {
                    id: row.id,
                    type: row.type,
                    title,
                    message,
                    receiverName,
                    isRead: row.is_read,
                    isSeen: row.is_seen,
                    createdAt: row.created_at,
                }
            })
            setRows(mappedRows)
        } catch (error: any) {
            toast.show(
                error?.message ?? error?.data?.message ?? 'Failed to load notifications.',
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                }
            )
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        void loadNotifications()
    }, [])

    const filteredRows = useMemo(() => {
        const keyword = searchParams.get('title')?.trim().toLowerCase() ?? ''
        if (!keyword) return rows
        return rows.filter(
            (row) =>
                row.title.toLowerCase().includes(keyword) ||
                row.message.toLowerCase().includes(keyword)
        )
    }, [rows, searchParams])

    return (
        <CrudTemplate<NotificationListItem>
            columns={notificationColumns}
            data={filteredRows}
            totalCount={filteredRows.length}
            isLoading={isLoading}
            enableCreate
            enableEdit
            enableView
            pageSizeOptions={[10, 25, 50, 100]}
            onCreateNavigate={() => navigate('/notifications/create')}
            onEditNavigate={(row) => navigate(`/notifications/${row.id}/edit`)}
            onViewNavigate={(row) => navigate(`/notifications/${row.id}`)}
            extraFilters={<SimpleSearch searchParamKeyName="title" />}
            title={NOTIFICATIONS_PAGE_TITLE}
        />
    )
}
