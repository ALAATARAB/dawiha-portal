import type { MedicineEntity } from '../../../common/entities/medicine/medicine.entity'
import type { GridColDef } from '@mui/x-data-grid'
import type { Tid } from '../../../common/@types/global'

import { Box, Link } from '@mui/material'
import { useState } from 'react'

import CrudTemplate from '../../../components/crud-template/CrudTemplate'
import { UserDetailsModal } from '../../../components/entity-modals/UserDetailsModal'
import {
    useGetMedicinesQuery,
    useDeleteMedicineMutation,
} from '../api/medicineApiSlice'


export const MedicineListPage = () => {
    const [page, setPage] = useState(1)
    const [perPage, setPerPage] = useState(10)
    const [selectedUserId, setSelectedUserId] = useState<number | null>(null)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const { data, isLoading } = useGetMedicinesQuery({ page, perPage })
    const [deleteMedicine] = useDeleteMedicineMutation()

    const handleUserClick = (userId: number) => {
        setSelectedUserId(userId)
        setUserModalOpen(true)
    }

    const handleCloseUserModal = () => {
        setUserModalOpen(false)
        setSelectedUserId(null)
    }

    const columns: GridColDef<MedicineEntity>[] = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'title', headerName: 'Title', width: 200 },
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
            field: 'week_day',
            headerName: 'Day',
            width: 120,
        },
        {
            field: 'quantity',
            headerName: 'Quantity',
            width: 100,
        },
        {
            field: 'instructions',
            headerName: 'Instructions',
            width: 200,
            valueFormatter: (value) => value || '-',
        },
        {
            field: 'dates',
            headerName: 'Dates',
            width: 200,
            valueGetter: (value: any) => {
                if (!value || !Array.isArray(value)) return '-'
                return value.length > 0 ? `${value.length} date(s)` : '-'
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
        await deleteMedicine(id as number)
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
                    title="Medicines"
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

export default MedicineListPage
