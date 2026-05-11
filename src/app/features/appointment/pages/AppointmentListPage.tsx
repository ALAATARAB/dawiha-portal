import type { AppointmentEntity, AppointmentStatus } from '../../../common/entities/appointment/appointment.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import { ProviderDetailsModal } from '../../../components/entity-modals/ProviderDetailsModal'
import {
    useGetAppointmentsQuery,
    useDeleteAppointmentMutation,
} from '../api/appointmentApiSlice'


const statusColors: Record<AppointmentStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    WAITING_PROVIDER_APPROVAL: 'warning',
    WAITING_CLIENT_APPROVAL: 'info',
    RESERVED: 'primary',
    COMPLETED: 'success',
    CANCELLED_BY_PROVIDER: 'error',
    CANCELLED_BY_CLIENT: 'error',
}

export const AppointmentListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)
    const [providerModalOpen, setProviderModalOpen] = useState(false)

    const { data, isLoading } = useGetAppointmentsQuery({ page, perPage })
    const [deleteAppointment] = useDeleteAppointmentMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleProviderClick = (providerId: number) => {
        setSelectedProviderId(providerId)
        setProviderModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const handleCloseProviderModal = () => {
        setProviderModalOpen(false)
        setSelectedProviderId(null)
    }

    const columns: GridColDef<AppointmentEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'date',
            headerName: 'Date',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleString()
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 220,
            renderCell: (params) => (
                <Chip
                    label={params.value?.replace(/_/g, ' ')}
                    color={statusColors[params.value as AppointmentStatus]}
                    size="small"
                />
            ),
        },
        {
            field: 'user_id',
            headerName: 'User ID',
            width: 100,
            renderCell: (params) => (
                <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleUserClick(params.value)
                    }}
                    sx={{ cursor: 'pointer' }}
                >
                    {params.value}
                </Link>
            ),
        },
        {
            field: 'provider_id',
            headerName: 'Provider ID',
            width: 120,
            renderCell: (params) => (
                <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                        e.stopPropagation()
                        handleProviderClick(params.value)
                    }}
                    sx={{ cursor: 'pointer' }}
                >
                    {params.value}
                </Link>
            ),
        },
        {
            field: 'user_notes',
            headerName: 'User Notes',
            width: 200,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'provider_notes',
            headerName: 'Provider Notes',
            width: 200,
            valueFormatter: (value) => value || '-',
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

    const handleDelete = async (id: Tid) => {
        await deleteAppointment(id as number)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPerPage(newPageSize)
        setPage(1)
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <CrudTemplate
                    title="Appointments"
                    columns={columns}
                    data={data?.data || []}
                    totalCount={data?.meta.total || 0}
                    isLoading={isLoading}
                    enableDelete
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
            <ProviderDetailsModal
                providerId={selectedProviderId}
                open={providerModalOpen}
                onClose={handleCloseProviderModal}
            />
        </>
    )
}

export default AppointmentListPage
