import type { ProviderAvailabilityEntity } from '../../../common/entities/provider-availability/provider-availability.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { ProviderDetailsModal } from '../../../components/entity-modals/ProviderDetailsModal'
import {
    useGetProviderAvailabilitiesQuery,
    useDeleteProviderAvailabilityMutation,
} from '../api/providerAvailabilityApiSlice'


export const ProviderAvailabilityListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedProviderId, setSelectedProviderId] = useState<number | null>(null)
    const [providerModalOpen, setProviderModalOpen] = useState(false)

    const { data, isLoading } = useGetProviderAvailabilitiesQuery({ page, perPage })
    const [deleteProviderAvailability] = useDeleteProviderAvailabilityMutation()

    const handleProviderClick = (providerId: number) => {
        setSelectedProviderId(providerId)
        setProviderModalOpen(true)
    }

    const handleCloseProviderModal = () => {
        setProviderModalOpen(false)
        setSelectedProviderId(null)
    }

    const columns: GridColDef<ProviderAvailabilityEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
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
        { field: 'work_day', headerName: 'Day', width: 130 },
        {
            field: 'from',
            headerName: 'From',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleTimeString()
            },
        },
        {
            field: 'to',
            headerName: 'To',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleTimeString()
            },
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
        await deleteProviderAvailability(id as number)
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
                    title="Provider Schedules"
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
            <ProviderDetailsModal
                providerId={selectedProviderId}
                open={providerModalOpen}
                onClose={handleCloseProviderModal}
            />
        </>
    )
}

export default ProviderAvailabilityListPage
