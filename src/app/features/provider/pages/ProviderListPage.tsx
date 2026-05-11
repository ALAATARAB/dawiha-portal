import type { ProviderEntity, ProviderType } from '../../../common/entities/provider/provider.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'
import { useNotifications } from '@toolpad/core/useNotifications'
import { useTranslation } from 'react-i18next'

import ProviderFormItems from './ProviderFormItems'
import { type UpdateProviderDto } from '../../../common/dtos/provider/update-provider.dto'
import { isNotEmpty } from '../../../common/utils/is-object-empty'
import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useGetProvidersQuery,
    useUpdateProviderMutation,
    useDeleteProviderMutation,
} from '../api/providerApiSlice'


const typeColors: Record<ProviderType, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    DOCTOR: 'primary',
    NURSE: 'info',
    CLINIC: 'secondary',
    HOSPITAL: 'success',
}

export const ProviderListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)
    const notifications = useNotifications()
    const { t } = useTranslation()

    const { data, isLoading } = useGetProvidersQuery({ page, perPage })
    const [updateProvider, { isLoading: isUpdating }] = useUpdateProviderMutation()
    const [deleteProvider, { isLoading: isDeleting }] = useDeleteProviderMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const columns: GridColDef<ProviderEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        {
            field: 'type',
            headerName: 'Type',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={typeColors[params.value as ProviderType]}
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
            field: 'phone_numbers',
            headerName: 'Phone Numbers',
            width: 180,
            valueGetter: (value: any) => {
                if (!value || !Array.isArray(value) || value.length === 0) return '-'
                return value.join(', ')
            },
        },
        {
            field: 'lat',
            headerName: 'Location',
            width: 150,
            valueGetter: (_, row) => {
                if (row.lat && row.lng) {
                    return `${row.lat.toFixed(4)}, ${row.lng.toFixed(4)}`
                }
                return '-'
            },
        },
        {
            field: 'categories',
            headerName: 'Categories',
            width: 150,
            valueGetter: (value: any) => {
                if (!value || !Array.isArray(value)) return '0'
                return `${value.length} categories`
            },
        },
        {
            field: 'booking_fees',
            headerName: 'Booking Fees',
            width: 120,
            valueFormatter: (value) => value ? `$${value}` : '-',
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
        try {
            await deleteProvider(id as number).unwrap()
            notifications.show(t('Provider deleted successfully'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message || 'Failed to delete provider', {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const handleEdit = async (id: Tid, formData: Record<string, unknown>) => {
        try {
            if (!isNotEmpty(formData)) {
                return
            }

            const data: Partial<UpdateProviderDto> = {}

            if (formData.title !== undefined) {
                data.title = String(formData.title ?? '').trim()
            }
            if (formData.type !== undefined) {
                data.type = formData.type as ProviderType
            }
            if (formData.about !== undefined) {
                data.about = String(formData.about ?? '').trim()
            }
            if (formData.description !== undefined) {
                data.description = String(formData.description ?? '').trim()
            }
            if (formData.booking_fees !== undefined) {
                data.booking_fees = Number(formData.booking_fees)
            }
            if (formData.lat !== undefined) {
                data.lat = Number(formData.lat)
            }
            if (formData.lng !== undefined) {
                data.lng = Number(formData.lng)
            }
            if (formData.phone_numbers !== undefined && Array.isArray(formData.phone_numbers)) {
                data.phone_numbers = formData.phone_numbers as string[]
            }
            if (formData.categories !== undefined && Array.isArray(formData.categories)) {
                data.categories = formData.categories as string[]
            }

            if (!isNotEmpty(data)) {
                return
            }

            await updateProvider({
                id: id as number,
                data: data as UpdateProviderDto,
            }).unwrap()

            notifications.show(t('Provider updated successfully'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message || 'Failed to update provider', {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPerPage(newPageSize)
        setPage(1) // Reset to first page when changing page size
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <CrudTemplate<ProviderEntity>
                    title="Providers"
                    columns={columns}
                    data={data?.data || []}
                    totalCount={data?.meta.total || 0}
                    isLoading={isLoading || isUpdating || isDeleting}
                    enableView
                    enableEdit
                    enableDelete
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    pagination={{
                        page,
                        pageSize: perPage,
                        onPageChange: handlePageChange,
                        onPageSizeChange: handlePageSizeChange,
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                    DefaultFormItems={ProviderFormItems}
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

export default ProviderListPage
