import type { ProviderRatingEntity } from '../../../common/entities/provider-rating/provider-rating.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Link, Rating } from '@mui/material'
import { useNotifications } from '@toolpad/core/useNotifications'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { ProviderDetailsModal } from '../../../components/entity-modals/ProviderDetailsModal'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useDeleteProviderRatingMutation,
    useGetProviderRatingsQuery,
    useUpdateProviderRatingMutation,
} from '../api/providerRatingApiSlice'
import ProviderRatingFormItems, {
    type ProviderRatingFormValues,
} from '../components/ProviderRatingFormItems'

export const ProviderRatingListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)
    const [providerModalOpen, setProviderModalOpen] = useState(false)
    const toast = useNotifications()

    const { data, isLoading } = useGetProviderRatingsQuery({ page, perPage })
    const [updateProviderRating, { isLoading: isUpdating }] =
        useUpdateProviderRatingMutation()
    const [deleteProviderRating, { isLoading: isDeleting }] =
        useDeleteProviderRatingMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleProviderClick = (providerId: number) => {
        setSelectedProviderId(providerId)
        setProviderModalOpen(true)
    }

    const columns: GridColDef<ProviderRatingEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'user_id',
            headerName: 'User',
            width: 180,
            renderCell: (params) => {
                const user = params.row.user
                const label = user?.full_name || `User #${params.value}`
                return (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleUserClick(params.value)
                        }}
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {label}
                    </Link>
                )
            },
        },
        {
            field: 'provider_id',
            headerName: 'Provider',
            width: 200,
            renderCell: (params) => {
                const provider = params.row.provider
                const label = provider?.title || `Provider #${params.value}`
                return (
                    <Link
                        component="button"
                        variant="body2"
                        onClick={(e) => {
                            e.stopPropagation()
                            handleProviderClick(params.value)
                        }}
                        sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        {label}
                    </Link>
                )
            },
        },
        {
            field: 'stars',
            headerName: 'Rating',
            width: 160,
            renderCell: (params) => (
                <Rating value={params.value} readOnly size="small" />
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

    const handleEdit = async (id: Tid, formData: ProviderRatingFormValues) => {
        try {
            await updateProviderRating({
                id: id as number,
                data: { stars: Number(formData.stars) },
            }).unwrap()
            toast.show('Provider rating updated successfully.', {
                severity: 'success',
                autoHideDuration: 2500,
            })
        } catch (error: any) {
            toast.show(error?.data?.message || 'Failed to update provider rating.', {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const handleDelete = async (id: Tid) => {
        try {
            await deleteProviderRating(id as number).unwrap()
            toast.show('Provider rating deleted successfully.', {
                severity: 'success',
                autoHideDuration: 2500,
            })
        } catch (error: any) {
            toast.show(error?.data?.message || 'Failed to delete provider rating.', {
                severity: 'error',
                autoHideDuration: 3000,
            })
        }
    }

    const defaultKeyMap = {
        id: 'id',
        stars: 'stars',
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <CrudTemplate<ProviderRatingFormValues>
                    title="Provider Ratings"
                    columns={columns}
                    data={data?.data || []}
                    totalCount={data?.meta.total || 0}
                    isLoading={isLoading || isUpdating || isDeleting}
                    enableEdit
                    enableView
                    enableDelete
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    DefaultFormItems={ProviderRatingFormItems}
                    defaultKeyMap={defaultKeyMap}
                    pagination={{
                        page,
                        pageSize: perPage,
                        onPageChange: setPage,
                        onPageSizeChange: (size) => {
                            setPerPage(size)
                            setPage(1)
                        },
                    }}
                    pageSizeOptions={[10, 25, 50, 100]}
                />
            </Box>
            <UserDetailsModal
                userId={selectedUserId}
                open={userModalOpen}
                onClose={() => {
                    setUserModalOpen(false)
                    setSelectedUserId(null)
                }}
            />
            <ProviderDetailsModal
                providerId={selectedProviderId}
                open={providerModalOpen}
                onClose={() => {
                    setProviderModalOpen(false)
                    setSelectedProviderId(null)
                }}
            />
        </>
    )
}

export default ProviderRatingListPage
