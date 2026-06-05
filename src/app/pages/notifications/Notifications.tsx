import { useNotifications } from '@toolpad/core/useNotifications'
import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { type NotificationType } from '../../common/dtos/notification/create-custom-notification.dto'
import CrudTemplate from '../../components/crud-template/CrudTemplate'
import { SimpleSearch } from '../../components/simple-search/SimpleSearch'
import { useGetNotificationsQuery } from '../../features/notification/api/notificationApiSlice'
import { NOTIFICATIONS_PAGE_TITLE, notificationColumns } from './constant'
import { type NotificationListItem } from './types'

const FALLBACK_TITLE: Record<NotificationType, string> = {
    CUSTOM: 'Custom notification',
    APPOINTMENT_CREATED: 'Appointment created notification',
    APPOINTMENT_UPDATED: 'Appointment updated notification',
    REQUEST_CREATED: 'Request created notification',
    REQUEST_UPDATED: 'Request updated notification',
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

    // Query with proper defaults matching server expectations
    const { data, isLoading, error } = useGetNotificationsQuery({
        page: 1,
        perPage: 100,
    })

    // Show error toast if there's an error (must be in useEffect to avoid render issues)
    useEffect(() => {
        if (error) {
            console.error('Notifications error:', error)
            const errorMessage =
                (error as any)?.data?.message ||
                (error as any)?.error ||
                (error as any)?.message ||
                'Failed to load notifications.'

            toast.show(errorMessage, {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }, [error, toast])

    const rows = useMemo(() => {
        if (!data?.data) return []

        return data.data.map((row): NotificationListItem => {
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
    }, [data])

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
            enableView
            pageSizeOptions={[10, 25, 50, 100]}
            onCreateNavigate={() => navigate('/notifications/create')}
            onViewNavigate={(row) => navigate(`/notifications/${row.id}`)}
            extraFilters={<SimpleSearch searchParamKeyName="title" />}
            title={NOTIFICATIONS_PAGE_TITLE}
        />
    )
}
