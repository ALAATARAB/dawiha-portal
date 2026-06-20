import type { NotificationListItem } from './types'

import { Box, Chip, Link } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'

export const NOTIFICATIONS_PAGE_TITLE = 'Notifications'

const formatDateTime = (value: string) =>
    new Date(value).toLocaleString(undefined, {
        dateStyle: 'short',
        timeStyle: 'short',
    })

type NotificationColumnsOptions = {
    onReceiverClick: (receiverId: number) => void
}

export const getNotificationColumns = ({
    onReceiverClick,
}: NotificationColumnsOptions): GridColDef<NotificationListItem>[] => [
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
        valueFormatter: (value) => value || '-',
    },
    {
        field: 'message',
        headerName: 'Message',
        minWidth: 260,
        flex: 1.2,
        renderCell: (params) => (
            <Box
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}
                title={params.value || '-'}
            >
                {params.value || '-'}
            </Box>
        ),
    },
    {
        field: 'receiverName',
        headerName: 'Receiver',
        width: 180,
        renderCell: (params) => {
            const { receiverId, receiverName } = params.row
            if (!receiverId) {
                return receiverName || '-'
            }

            return (
                <Link
                    component="button"
                    variant="body2"
                    onClick={(e) => {
                        e.stopPropagation()
                        onReceiverClick(receiverId)
                    }}
                    sx={{ cursor: 'pointer', textDecoration: 'underline' }}
                >
                    {receiverName}
                </Link>
            )
        },
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
