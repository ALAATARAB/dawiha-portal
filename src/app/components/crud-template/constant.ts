import type { Tid } from '../../common/@types/global'

import { type GridColDef } from '@mui/x-data-grid'

export interface CrudFormProps<TData> {
    mode: 'create' | 'edit' | 'view'
    initialData: TData | null
    onSubmit: (data: TData) => void
    onCancel: () => void
}

export interface ICrudTemplateProps<TData> {
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
    enableCreate?: boolean

    onEdit?: (id: Tid, updatedData: TData) => void
    /** When set, the Edit action runs this (e.g. navigate to a full-page form) instead of opening the drawer. */
    onEditNavigate?: (row: TData) => void
    /** When set, the View action runs this instead of the drawer or `viewUrl` navigation. */
    onViewNavigate?: (row: TData) => void
    onView?: (row: TData) => void
    onDelete?: (id: Tid) => void
    onCreate?: (row: TData) => void
    /** When set, "Create New" navigates here instead of opening the drawer. */
    onCreateNavigate?: () => void

    DefaultFormItems?: React.ComponentType<any>
    ViewItems?: React.ComponentType<any>
    CreateItems?: React.ComponentType<any>
    UpdateItems?: React.ComponentType<any>

    defaultKeyMap?: Record<string, string>
    createKeyMap?: Record<string, string>
    updateKeyMap?: Record<string, string>
    viewKeyMap?: Record<string, string>

    /** Initial values for the create form when no row is selected */
    getCreateInitialData?: () => TData | null | undefined

    totalCount?: number
    isLoading?: boolean

    title?: string

    extraButtons?: React.ReactNode
    extraFilters?: React.ReactNode
    isViewModePage?: boolean
    viewUrl?: string
    showTableTitle?: boolean

    isPatchMethod?: boolean
    renderRowActions?: (row: TData) => React.ReactNode
}
