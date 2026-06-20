import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import {
    Box,
    Button,
    Chip,
    Paper,
    Stack,
    Typography,
    alpha,
} from '@mui/material'
import { useNotifications } from '@toolpad/core/useNotifications'
import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

import type { NotificationEntity } from '../../common/entities/notification/notification.entity'
import { NotificationForm } from '../../components/notification-form'
import {
    useGetNotificationsQuery,
    useMarkNotificationAsReadMutation,
} from '../../features/notification/api/notificationApiSlice'

export default function CreateNotificationPage() {
    const navigate = useNavigate()
    const location = useLocation()
    const toast = useNotifications()
    const { notificationId } = useParams<{ notificationId: string }>()

    const isCreate = location.pathname.endsWith('/create')
    const isEdit = location.pathname.endsWith('/edit')
    const parsedId = notificationId ? Number(notificationId) : NaN

    const [existing, setExisting] = useState<NotificationEntity | null>(null)

    const { data: notificationsData, isLoading, error: fetchError } =
        useGetNotificationsQuery(
            { page: 1, perPage: 100 },
            { skip: isCreate || !Number.isFinite(parsedId) || parsedId <= 0 }
        )

    const [markAsRead] = useMarkNotificationAsReadMutation()

    const payload = useMemo(() => {
        const value = existing?.payload
        if (value && typeof value === 'object' && !Array.isArray(value)) {
            return value as Record<string, unknown>
        }
        return {}
    }, [existing])

    useEffect(() => {
        if (isCreate || !Number.isFinite(parsedId) || parsedId <= 0) return

        if (fetchError) {
            toast.show('Failed to load notification.', {
                severity: 'error',
                autoHideDuration: 3000,
            })
            return
        }

        if (notificationsData?.data) {
            const row =
                notificationsData.data.find((item) => item.id === parsedId) ??
                null
            setExisting(row)
        }
    }, [isCreate, parsedId, notificationsData, fetchError, toast])

    const handleMarkAsRead = async () => {
        if (!existing || existing.is_read) return
        try {
            await markAsRead(existing.id).unwrap()
            setExisting((prev) => (prev ? { ...prev, is_read: true } : prev))
            toast.show('Notification marked as read.', {
                severity: 'success',
                autoHideDuration: 2500,
            })
        } catch (error: any) {
            toast.show(
                error?.message ??
                    error?.data?.message ??
                    'Failed to update notification.',
                {
                    severity: 'error',
                    autoHideDuration: 3000,
                }
            )
        }
    }

    if (!isCreate && !existing) {
        return (
            <Paper sx={{ p: 3, maxWidth: 560, mx: 'auto', borderRadius: 2 }}>
                <Typography color="error" sx={{ mb: 2 }}>
                    {isLoading ? 'Loading notification...' : 'Notification not found.'}
                </Typography>
                <Button onClick={() => navigate('/notifications')}>
                    Back to list
                </Button>
            </Paper>
        )
    }

    return (
        <Box sx={{ p: { xs: 2, md: 3 }, maxWidth: 1100, mx: 'auto' }}>
            <Button
                startIcon={<ArrowBackIcon />}
                onClick={() => navigate('/notifications')}
                color="inherit"
                sx={{ mb: 2 }}
            >
                Back to notifications
            </Button>

            {isCreate ? (
                <Stack spacing={3}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: { xs: 2.5, md: 3 },
                            borderRadius: 3,
                            background: (theme) =>
                                `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                            color: '#fff',
                        }}
                    >
                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            alignItems={{ xs: 'flex-start', sm: 'center' }}
                            justifyContent="space-between"
                        >
                            <Stack direction="row" spacing={2} alignItems="center">
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 2,
                                        display: 'grid',
                                        placeItems: 'center',
                                        bgcolor: alpha('#fff', 0.2),
                                    }}
                                >
                                    <NotificationsActiveIcon />
                                </Box>
                                <Box>
                                    <Typography variant="h5" fontWeight={800}>
                                        Create notification
                                    </Typography>
                                    <Typography sx={{ opacity: 0.92, mt: 0.5 }}>
                                        Compose and send a push notification to your
                                        users with clear targeting.
                                    </Typography>
                                </Box>
                            </Stack>
                            <Chip
                                label="Admin broadcast"
                                sx={{
                                    bgcolor: alpha('#fff', 0.2),
                                    color: '#fff',
                                    fontWeight: 600,
                                }}
                            />
                        </Stack>
                    </Paper>

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
                </Stack>
            ) : (
                <Paper sx={{ p: 3, borderRadius: 2 }}>
                    <Stack spacing={3}>
                        <Typography variant="h5" fontWeight={600}>
                            {isEdit
                                ? 'Update notification status'
                                : 'Notification details'}
                        </Typography>

                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Type
                            </Typography>
                            <Typography variant="body1">{existing?.type}</Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Title
                            </Typography>
                            <Typography variant="body1">
                                {existing?.title || '—'}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Message
                            </Typography>
                            <Typography variant="body1">
                                {existing?.body || '—'}
                            </Typography>
                        </Stack>

                        <Stack spacing={1}>
                            <Typography variant="body2" color="text.secondary">
                                Payload
                            </Typography>
                            <Paper
                                variant="outlined"
                                sx={{ p: 2, bgcolor: 'grey.50' }}
                            >
                                <Typography
                                    component="pre"
                                    sx={{
                                        m: 0,
                                        whiteSpace: 'pre-wrap',
                                        fontFamily: 'monospace',
                                        fontSize: 13,
                                    }}
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
                            <Button
                                color="inherit"
                                onClick={() => navigate('/notifications')}
                            >
                                Back
                            </Button>
                            {!existing?.is_read ? (
                                <Button
                                    variant="contained"
                                    onClick={() => void handleMarkAsRead()}
                                >
                                    Mark as read
                                </Button>
                            ) : null}
                        </Stack>
                    </Stack>
                </Paper>
            )}
        </Box>
    )
}
