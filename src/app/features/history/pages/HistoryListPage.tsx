import type { HistoryEntity, HistoryType } from '../../../common/entities/history/history.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useGetHistoriesQuery,
    useDeleteHistoryMutation,
} from '../api/historyApiSlice'


const typeColors: Record<HistoryType, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    MEDICAL_RECORD: 'primary',
    PREGNANCY_HISTORY: 'secondary',
    SURGERY_HISTORY: 'error',
    ALLERGY_HISTORY: 'warning',
    MEDICATION_HISTORY: 'info',
    FAMILY_HISTORY: 'success',
}

export const HistoryListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { data, isLoading } = useGetHistoriesQuery({ page, perPage })
    const [deleteHistory] = useDeleteHistoryMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const columns: GridColDef<HistoryEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
        {
            field: 'type',
            headerName: 'Type',
            width: 180,
            renderCell: (params) => (
                <Chip
                    label={params.value?.replace(/_/g, ' ')}
                    color={typeColors[params.value as HistoryType]}
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
            field: 'description',
            headerName: 'Description',
            width: 250,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'date',
            headerName: 'Date',
            width: 150,
            valueFormatter: (value) => {
                if (!value) return '-'
                return new Date(value).toLocaleDateString()
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
        await deleteHistory(id as number)
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
                    title="Medical Histories"
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
        </>
    )
}

export default HistoryListPage
