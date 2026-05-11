import type { CategoryEntity } from '../../common/entities/category/category.entity'

import { type GridColDef } from '@mui/x-data-grid'

/** Form + table row shape matching backend entity */
export type CategoryFormValues = {
    id: number
    title: string
    description?: string
    created_at?: string
    updated_at?: string
}

/** Used as the page title and sidebar label for Categories */
export const CATEGORIES_PAGE_TITLE = 'Categories'

export const categoryTableColumns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
        field: 'title',
        headerName: 'Title',
        flex: 1,
        minWidth: 200,
    },
    {
        field: 'description',
        headerName: 'Description',
        flex: 1,
        minWidth: 250,
        valueFormatter: (value) => value || '—',
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

/**
 * Maps form field names to payload keys when submitting.
 */
export const categoryDefaultKeyMapper: Record<string, string> = {
    id: 'id',
    title: 'title',
    description: 'description',
}

/**
 * Builds form default values from a category row.
 */
export function getCategoryFormDefaults(row: CategoryEntity): CategoryFormValues
export function getCategoryFormDefaults(row: null | undefined): undefined
export function getCategoryFormDefaults(
    row: CategoryEntity | null | undefined
): CategoryFormValues | undefined {
    if (!row) return undefined
    return {
        id: row.id,
        title: row.title,
        description: row.description ?? '',
        created_at: row.created_at,
        updated_at: row.updated_at,
    }
}
