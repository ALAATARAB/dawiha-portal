import type { AdsEntity } from '../../../common/entities/ads/ads.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Link, Avatar } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import {
    useGetAdsQuery,
    useDeleteAdMutation,
} from '../api/adsApiSlice'
import { AdsFormModal } from '../components/AdsFormModal'

export const AdsListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [editingAd, setEditingAd] = useState<AdsEntity | null>(null)
    const [isFormOpen, setIsFormOpen] = useState(false)

    const { data, isLoading } = useGetAdsQuery({ page, perPage })
    const [deleteAd] = useDeleteAdMutation()

    const columns: GridColDef<AdsEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        {
            field: 'image',
            headerName: 'Image',
            width: 100,
            renderCell: (params) => {
                const imageUrl = params.row.image?.url
                return imageUrl ? (
                    <Avatar
                        src={imageUrl}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                    />
                ) : (
                    <Avatar variant="rounded" sx={{ width: 56, height: 56 }}>
                        N/A
                    </Avatar>
                )
            },
        },
        {
            field: 'priority',
            headerName: 'Priority',
            width: 100,
        },
        {
            field: 'provider_id',
            headerName: 'Provider ID',
            width: 120,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'url',
            headerName: 'URL',
            width: 250,
            renderCell: (params) =>
                params.value ? (
                    <Link
                        href={params.value}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {params.value}
                    </Link>
                ) : (
                    '-'
                ),
        },
        {
            field: 'from',
            headerName: 'Start Date',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '-'
                return new Date(value).toLocaleString()
            },
        },
        {
            field: 'to',
            headerName: 'End Date',
            width: 180,
            valueFormatter: (value) => {
                if (!value) return '-'
                return new Date(value).toLocaleString()
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
        await deleteAd(id as number)
    }

    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const handlePageSizeChange = (newPageSize: number) => {
        setPerPage(newPageSize)
        setPage(1)
    }

    const handleCreate = () => {
        setEditingAd(null)
        setIsFormOpen(true)
    }

    const handleEdit = (ad: AdsEntity) => {
        setEditingAd(ad)
        setIsFormOpen(true)
    }

    const handleCloseForm = () => {
        setIsFormOpen(false)
        setEditingAd(null)
    }

    return (
        <>
            <Box sx={{ p: 3 }}>
                <CrudTemplate
                    title="Ads"
                    columns={columns}
                    data={data?.data || []}
                    totalCount={data?.meta.total || 0}
                    isLoading={isLoading}
                    enableCreate
                    enableEdit
                    enableDelete
                    onCreateNavigate={handleCreate}
                    onEditNavigate={handleEdit}
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
            <AdsFormModal
                open={isFormOpen}
                onClose={handleCloseForm}
                ad={editingAd}
            />
        </>
    )
}

export default AdsListPage
