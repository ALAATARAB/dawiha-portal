import type { NotificationEntity } from '../../../common/entities/notification/notification.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useGetNotificationsQuery,
    useDeleteNotificationMutation,
} from '../api/notificationApiSlice'

export const NotificationListPage = () => {
    const navigate = useNavigate()
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { data, isLoading } = useGetNotificationsQuery({ page, perPage })
    const [deleteNotification] = useDeleteNotificationMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const columns: GridColDef<NotificationEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'type',
            headerName: 'Type',
            width: 150,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    size="small"
                    color={params.value === 'CUSTOM' ? 'primary' : 'default'}
                />
            ),
        },
        {
            field: 'title',
            headerName: 'Title',
            width: 200,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'body',
            headerName: 'Message',
            width: 300,
            renderCell: (params) => (
                <Box
                    sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                    }}
                    title={params.value || '-'}
                >
                    {params.value || '-'}
                </Box>
            ),
        },
        {
            field: 'receiver',
            headerName: 'Receiver',
            width: 180,
            renderCell: (params) => {
                const receiver = params.row.receiver
                return receiver ? (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleUserClick(receiver.id)
                        }}
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {receiver.full_name}
                    </Link>
                ) : (
                    '-'
                )
            },
        },
        {
            field: 'is_read',
            headerName: 'Read',
            width: 100,
            renderCell: (params) => (
                <Chip
                    label={params.value ? 'Yes' : 'No'}
                    size="small"
                    color={params.value ? 'success' : 'warning'}
                />
            ),
        },
        {
            field: 'created_at',
            headerName: 'Created At',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleString()
            },
        },
    ]

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPerPage(newPageSize)
        setPage(1)
    }

    const handleCreate = () => {
        navigate('/notifications/create')
    }

    const handleEdit = (id: Tid) => {
        navigate(`/notifications/edit/${id}`)
    }

    const handleDelete = async (id: Tid) => {
        await deleteNotification(id as number)
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <CrudTemplate
                    title="Notifications"
                    columns={columns}
                    data={data?.data || []}
                    totalCount={data?.meta.total || 0}
                    isLoading={isLoading}
                    enableCreate
                    enableEdit
                    enableDelete
                    onCreateNavigate={handleCreate}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    pagination={{
                        page,
                        pageSize: perPage,
                        onPageChange: handlePageChange,
                        onPageSizeChange: handlePageSizeChange,
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
            <UserDetailsModal
                userId={selectedUserId}
                open={userModalOpen}
                onClose={handleCloseUserModal}
            />
        </>
    )
}

export default NotificationListPage
