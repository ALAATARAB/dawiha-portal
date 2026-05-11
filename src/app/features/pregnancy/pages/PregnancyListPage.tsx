import type { PregnancyEntity, PregnancyStatus } from '../../../common/entities/pregnancy/pregnancy.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Chip, Link } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useGetPregnanciesQuery,
    useDeletePregnancyMutation,
} from '../api/pregnancyApiSlice'


const statusColors: Record<PregnancyStatus, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    ACTIVE: 'success',
    CANCELED: 'error',
    DONE: 'primary',
}

export const PregnancyListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { data, isLoading } = useGetPregnanciesQuery({ page, perPage })
    const [deletePregnancy] = useDeletePregnancyMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const columns: GridColDef<PregnancyEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
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
            field: 'start',
            headerName: 'Start Date',
            width: 150,
            valueFormatter: (value) => {
                if (!value) return ''
                return new Date(value).toLocaleDateString()
            },
        },
        {
            field: 'status',
            headerName: 'Status',
            width: 120,
            renderCell: (params) => (
                <Chip
                    label={params.value}
                    color={statusColors[params.value as PregnancyStatus]}
                    size="small"
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

    const handleDelete = async (id: Tid) => {
        await deletePregnancy(id as number)
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
                    title="Pregnancies"
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

export default PregnancyListPage
