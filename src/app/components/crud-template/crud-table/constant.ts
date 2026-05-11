import { type GridColDef } from '@mui/x-data-grid'

export type TPaginationModel = {
    page: number
    pageSize: number
}
export interface ICrudTableProps<TData> {
    columns: GridColDef[]
    data: TData[]
    height?: number
    width?: string | number
    pagination?: { page: number; pageSize: number }
    pageSizeOptions?: number[]
    enableSelect?: boolean
    border?: number

    enableEdit?: boolean
    enableView?: boolean
    enableDelete?: boolean

    onEdit?: (row: TData) => void
    onView?: (row: TData) => void
    onDelete?: (row: TData) => void
    renderRowActions?: (row: TData) => React.ReactNode

    totalCount?: number
    isLoading?: boolean
}
