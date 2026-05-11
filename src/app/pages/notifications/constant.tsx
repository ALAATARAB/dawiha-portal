import type { NotificationListItem } from './types'

import { Chip } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'


export const NOTIFICATIONS_PAGE_TITLE = 'Notifications'

const formatDateTime = (value: string) =>
    new Date(value).toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
    })

export const notificationColumns: GridColDef<NotificationListItem>[] = [
    { field: 'id', headerName: 'ID', width: 80 },
    {
        field: 'type',
        headerName: 'Type',
        width: 170,
    },
    {
        field: 'title',
        headerName: 'Title',
        minWidth: 220,
        flex: 1,
    },
    {
        field: 'message',
        headerName: 'Message',
        minWidth: 260,
        flex: 1.2,
    },
    {
        field: 'receiverName',
        headerName: 'Receiver',
        width: 180,
    },
    {
        field: 'isRead',
        headerName: 'Read',
        width: 100,
        renderCell: (params) => (
            <Chip
                size="small"
                label={params.row.isRead ? 'Yes' : 'No'}
                color={params.row.isRead ? 'success' : 'warning'}
                variant={params.row.isRead ? 'filled' : 'outlined'}
            />
        ),
    },
    {
        field: 'createdAt',
        headerName: 'Created',
        width: 170,
        valueGetter: (_, row) => formatDateTime(row.createdAt),
    },
]
