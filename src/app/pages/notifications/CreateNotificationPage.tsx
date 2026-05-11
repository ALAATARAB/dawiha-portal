import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { Box, Button, Chip, Paper, Stack, Typography } from '@mui/material'
import { useNotifications } from '@toolpad/core/useNotifications'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import { notificationService, type NotificationResponseItem } from '../../common/services/notification.service'
import { NotificationForm } from '../../components/notification-form'

export default function CreateNotificationPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useNotifications()
    const { notificationId } = useParams<{ notificationId: string }>()

    const isCreate = location.pathname.endsWith('/create')
    const isEdit = location.pathname.endsWith('/edit')
    // const isView = !isCreate && !isEdit
    const parsedId = notificationId ? Number(notificationId) : NaN

    const [existing, setExisting] = useState<NotificationResponseItem | null>(null)
    const [loading, setLoading] = useState(false)

    const payload = useMemo(() => {
        const value = existing?.payload
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value as Record<string, unknown>
        }
        return {}
    }, [existing])

    useEffect(() => {
        if (isCreate || !Number.isFinite(parsedId) || parsedId <= 0) return
        const load = async () => {
            try {
                setLoading(true)
                const response = await notificationService.getNotifications({
                    page: 1,
                    perPage: 100,
                })
                const row = response.data.find((item) => item.id === parsedId) ?? null
                setExisting(row)
            } catch (error: any) {
                toast.show(
                    error?.message ?? error?.data?.message ?? 'Failed to load notification.',
                    {
                        severity: 'error',
                        autoHideDuration: 3000,
                    }
                )
            } finally {
                setLoading(false)
            }
        }
        void load()
    }, [isCreate, parsedId])

    const markAsRead = async () => {
        if (!existing || existing.is_read) return
        try {
            await notificationService.markAsRead(existing.id)
            setExisting((prev) => (prev ? { ...prev, is_read: true } : prev))
            toast.show('Notification marked as read.', {
                severity: 'success',
                autoHideDuration: 2500,
            })
        } catch (error: any) {
            toast.show(
                error?.message ?? error?.data?.message ?? 'Failed to update notification.',
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                }
            )
        }
    }

    if (!isCreate && !existing) {
        return (
            <Paper sx={{ p: 3, maxWidth: 560, mx: 'auto' }}>
                <Typography color="error" sx={{ mb: 2 }}>
                    {loading ? 'Loading notification...' : 'Notification not found.'}
                </Typography>
                <Button onClick={() => navigate('/notifications')}>Back to list</Button>
            </Paper>
        )
    }

    return (
        <Box sx={{ p: 2, maxWidth: 900, mx: 'auto' }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={() => navigate('/notifications')}
                    color="inherit"
                >
                    Back
                </Button>
            </Stack>
            <Paper sx={{ p: 3 }}>
                <Stack spacing={3}>
                    {isCreate ? (
                        <>
                            <Typography variant="h5" fontWeight={600}>
                                Create notification
                            </Typography>
                            <NotificationForm
                                onSuccess={() => {
                                    toast.show('Notification created successfully.', {
                                        severity: 'success',
                                        autoHideDuration: 2500,
                                    })
                                    navigate('/notifications')
                                }}
                                onError={(error) => {
                                    toast.show(error.message, {
                                        severity: 'error',
                                        autoHideDuration: 3000,
                                    })
                                }}
                            />
                        </>
                    ) : (
                        <>
                            <Typography variant="h5" fontWeight={600}>
                                {isEdit ? 'Update notification status' : 'Notification details'}
                            </Typography>

                            <Stack spacing={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Type
                                </Typography>
                                <Typography variant="body1">{existing?.type}</Typography>
                            </Stack>

                            <Stack spacing={1}>
                                <Typography variant="body2" color="text.secondary">
                                    Payload
                                </Typography>
                                <Paper variant="outlined" sx={{ p: 2 }}>
                                    <Typography
                                        component="pre"
                                        sx={{ m: 0, whiteSpace: 'pre-wrap' }}
                                    >
                                        {JSON.stringify(payload, null, 2)}
                                    </Typography>
                                </Paper>
                            </Stack>

                            <Stack direction="row" spacing={1} alignItems="center">
                                <Chip
                                    label={existing?.is_read ? 'Read' : 'Unread'}
                                    color={existing?.is_read ? 'success' : 'warning'}
                                />
                                <Chip
                                    label={existing?.is_seen ? 'Seen' : 'Unseen'}
                                    color={existing?.is_seen ? 'info' : 'default'}
                                />
                            </Stack>

                            <Stack direction="row" justifyContent="flex-end" spacing={2}>
                                <Button color="inherit" onClick={() => navigate('/notifications')}>
                                    Back
                                </Button>
                                {!existing?.is_read ? (
                                    <Button variant="contained" onClick={() => void markAsRead()}>
                                        Mark as read
                                    </Button>
                                ) : null}
                            </Stack>
                        </>
                    )}
                </Stack>
            </Paper>
        </Box>
    )
}
