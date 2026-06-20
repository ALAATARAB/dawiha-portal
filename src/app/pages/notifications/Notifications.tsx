import { useNotifications } from '@toolpad/core/useNotifications'
import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

import { type NotificationType } from '../../common/dtos/notification/create-custom-notification.dto'
import CrudTemplate from '../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../components/entity-modals/UserDetailsModal'
import { SimpleSearch } from '../../components/simple-search/SimpleSearch'
import {
    useDeleteNotificationMutation,
    useGetNotificationsQuery,
} from '../../features/notification/api/notificationApiSlice'
import { getNotificationColumns, NOTIFICATIONS_PAGE_TITLE } from './constant'
import { type NotificationListItem } from './types'

const FALLBACK_TITLE: Record<NotificationType, string> = {
    CUSTOM: 'Custom notification',
    APPOINTMENT_CREATED: 'Appointment created notification',
    APPOINTMENT_UPDATED: 'Appointment updated notification',
    REQUEST_CREATED: 'Request created notification',
    REQUEST_UPDATED: 'Request updated notification',
}

export default function Notifications() {
    const navigate = useNavigate()
    const toast = useNotifications()
    const [searchParams] = useSearchParams()
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { data, isLoading, error } = useGetNotificationsQuery({
        page: 1,
        perPage: 100,
    })
    const [deleteNotification] = useDeleteNotificationMutation()

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
            const receiverId = row.receiver?.id ?? null
            const receiverName =
                row.receiver?.full_name ||
                (receiverId ? `User #${receiverId}` : '—')

            return {
                id: row.id,
                type: row.type,
                title: row.title || FALLBACK_TITLE[row.type],
                message: row.body || '—',
                receiverId,
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

    const columns = useMemo(
        () =>
            getNotificationColumns({
                onReceiverClick: (receiverId) => {
                    setSelectedUserId(receiverId)
                    setUserModalOpen(true)
                },
            }),
        []
    )

    const handleDelete = async (id: number) => {
        try {
            await deleteNotification(id).unwrap()
            toast.show('Notification deleted successfully.', {
                severity: 'success',
                autoHideDuration: 2500,
            })
        } catch (deleteError: any) {
            toast.show(
                deleteError?.data?.message ||
                    deleteError?.message ||
                    'Failed to delete notification.',
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                }
            )
        }
    }

    return (
        <>
            <CrudTemplate<NotificationListItem>
                columns={columns}
                data={filteredRows}
                totalCount={filteredRows.length}
                isLoading={isLoading}
                enableCreate
                enableView
                enableEdit
                enableDelete
                pageSizeOptions={[10, 25, 50, 100]}
                onCreateNavigate={() => navigate('/notifications/create')}
                onViewNavigate={(row) => navigate(`/notifications/${row.id}`)}
                onEditNavigate={(row) =>
                    navigate(`/notifications/${row.id}/edit`)
                }
                onDelete={handleDelete}
                extraFilters={<SimpleSearch searchParamKeyName="title" />}
                title={NOTIFICATIONS_PAGE_TITLE}
            />
            <UserDetailsModal
                userId={selectedUserId}
                open={userModalOpen}
                onClose={() => {
                    setUserModalOpen(false)
                    setSelectedUserId(null)
                }}
            />
        </>
    )
}
