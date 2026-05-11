import { DataGrid } from '@mui/x-data-grid'
import { useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'

import { type ICrudTableProps } from './constant'
import { getTableColumns } from './util'

const CrudTable = <TData,>({
    columns,
    pagination = { page: 0, pageSize: 10 },
    pageSizeOptions = [10],
    enableSelect = false,
    data = [],
    enableEdit,
    enableView,
    enableDelete,
    onEdit,
    onView,
    onDelete,
    renderRowActions,
    totalCount = 0,
    isLoading = false,
    border = 0,
}: ICrudTableProps<TData>) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [isPaginationLoading, setIsPaginationLoading] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null)

    const pageParam = Number(searchParams.get('page')) || pagination.page + 1
    const perPageParam =
        Number(searchParams.get('perPage')) || pagination.pageSize
    const currentPage = pageParam - 1

    useEffect(() => {
        const newParams: Record<string, string> = {}
        if (!searchParams.get('page'))
            newParams.page = String(pagination.page + 1)
        if (!searchParams.get('perPage'))
            newParams.perPage = String(pagination.pageSize)
        if (Object.keys(newParams).length) {
            setSearchParams((prev) => {
                const updated = new URLSearchParams(prev)
                Object.entries(newParams).forEach(([key, value]) =>
                    updated.set(key, value)
                )
                return updated
            })
        }
    }, [])

    const handlePaginationChange = (paginationModel: {
        page: number
        pageSize: number
    }) => {
        setIsPaginationLoading(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => {
            setIsPaginationLoading(false)
            timerRef.current = null
        }, 2000)

        setSearchParams((prev) => {
            const updated = new URLSearchParams(prev)
            updated.set('page', String(paginationModel.page + 1))
            updated.set('perPage', String(paginationModel.pageSize))
            return updated
        })
    }

    useEffect(() => {
        return () => {
            if (timerRef.current) clearTimeout(timerRef.current)
        }
    }, [])

    return (
        <DataGrid
            rows={data}
            clipboardCopyCellDelimiter="Copied"
            loading={isLoading || isPaginationLoading}
            columns={getTableColumns(
                columns,
                enableEdit,
                enableView,
                enableDelete,
                onEdit,
                onView,
                onDelete,
                renderRowActions
            )}
            initialState={{
                pagination: {
                    paginationModel: {
                        page: currentPage,
                        pageSize: Math.min(Math.max(perPageParam, 0), 100),
                    },
                },
            }}
            onPaginationModelChange={handlePaginationChange}
            pageSizeOptions={pageSizeOptions}
            checkboxSelection={enableSelect}
            slotProps={{
                root: {
                    style: {
                        flex: 1,
                        minHeight: 0,
                    },
                },
                loadingOverlay: {
                    variant: 'linear-progress',
                    noRowsVariant: 'linear-progress',
                },
            }}
            sx={{
                border,
                '.MuiDataGrid-columnHeaderTitle': {
                    fontWeight: 'bold !important',
                    overflow: 'visible !important',
                },
                '& .table-header': {
                    fontFamily: '"Noto Sans", sans-serif',
                    fontStyle: {
                        bold: 600,
                    },
                },
                '& .table-cell': {
                    fontFamily: '"Noto Sans", sans-serif',
                    fontWeight: 400,
                },
            }}
            density="standard"
            paginationMode="server"
            rowCount={totalCount}
            estimatedRowCount={totalCount}
        />
    )
}

export default CrudTable
