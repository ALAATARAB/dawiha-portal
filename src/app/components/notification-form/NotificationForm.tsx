import CampaignIcon from '@mui/icons-material/Campaign'
import FilterListIcon from '@mui/icons-material/FilterList'
import GroupsIcon from '@mui/icons-material/Groups'
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive'
import SendIcon from '@mui/icons-material/Send'
import {
    Alert,
    Autocomplete,
    Box,
    Button,
    Chip,
    Divider,
    FormControlLabel,
    Grid,
    MenuItem,
    Paper,
    Stack,
    Switch,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    alpha,
} from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'

import {
    type CreateCustomNotificationDto,
    type NotificationType,
    type PregnancyStatus,
    type UserRole,
} from '../../common/dtos/notification/create-custom-notification.dto'
import type { ProviderType } from '../../common/entities/provider/provider.entity'
import { useCreateCustomNotificationMutation } from '../../features/notification/api/notificationApiSlice'
import { useGetUsersQuery } from '../../features/user/api/userApiSlice'

const NOTIFICATION_TYPES: NotificationType[] = [
    'CUSTOM',
    'APPOINTMENT_CREATED',
    'APPOINTMENT_UPDATED',
    'REQUEST_CREATED',
    'REQUEST_UPDATED',
]

const USER_ROLES: UserRole[] = ['USER', 'PROVIDER', 'ADMIN']

const PROVIDER_TYPES: ProviderType[] = ['DOCTOR', 'NURSE', 'CLINIC', 'HOSPITAL']

const PREGNANCY_STATUSES: PregnancyStatus[] = ['ACTIVE', 'CANCELED', 'DONE']

interface NotificationFormProps {
    onSuccess?: () => void
    onError?: (error: Error) => void
}

type NotificationFormValues = {
    type: NotificationType
    title?: string
    body?: string
}

type UserOption = {
    id: number
    name: string
}

function SectionCard({
    title,
    subtitle,
    icon,
    accentColor,
    children,
}: {
    title: string
    subtitle?: string
    icon: React.ReactNode
    accentColor: string
    children: React.ReactNode
}) {
    return (
        <Paper
            elevation={0}
            sx={{
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
                overflow: 'hidden',
                height: '100%',
            }}
        >
            <Box
                sx={{
                    px: 2.5,
                    py: 2,
                    bgcolor: accentColor,
                    color: '#fff',
                }}
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: alpha('#fff', 0.18),
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                            {title}
                        </Typography>
                        {subtitle ? (
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                {subtitle}
                            </Typography>
                        ) : null}
                    </Box>
                </Stack>
            </Box>
            <Box sx={{ p: 2.5 }}>{children}</Box>
        </Paper>
    )
}

export default function NotificationForm({ onSuccess, onError }: NotificationFormProps) {
    const [payloadText, setPayloadText] = useState('{}')
    const [payloadError, setPayloadError] = useState('')
    const [recipientError, setRecipientError] = useState('')
    const [selectedUsers, setSelectedUsers] = useState<UserOption[]>([])
    const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([])
    const [selectedProviderTypes, setSelectedProviderTypes] = useState<ProviderType[]>([])
    const [pregnancyStatus, setPregnancyStatus] = useState<PregnancyStatus | ''>('')
    const [fromAge, setFromAge] = useState('')
    const [toAge, setToAge] = useState('')
    const [useGlobal, setUseGlobal] = useState(false)

    const [createNotification, { isLoading: loading }] =
        useCreateCustomNotificationMutation()

    const { data: usersData, isLoading: loadingUsers, error: usersError } =
        useGetUsersQuery({ page: 1, perPage: 100 })

    const users = useMemo<UserOption[]>(() => {
        if (!usersData?.data) return []
        return usersData.data.map((user) => ({
            id: user.id,
            name: user.name || `User #${user.id}`,
        }))
    }, [usersData])

    useEffect(() => {
        if (usersError) {
            onError?.(new Error('Failed to load users'))
        }
    }, [usersError, onError])

    const {
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors },
    } = useForm<NotificationFormValues>({
        defaultValues: { type: 'CUSTOM' },
    })

    const notificationType = watch('type')

    const recipientSummary = useMemo(() => {
        if (useGlobal) return 'Broadcast to all users'
        const parts: string[] = []
        if (selectedUsers.length) parts.push(`${selectedUsers.length} user(s)`)
        if (selectedRoles.length) parts.push(`${selectedRoles.length} role(s)`)
        if (selectedProviderTypes.length)
            parts.push(`${selectedProviderTypes.length} provider type(s)`)
        if (pregnancyStatus) parts.push(`pregnancy: ${pregnancyStatus}`)
        if (fromAge || toAge) parts.push(`age ${fromAge || '…'}–${toAge || '…'}`)
        return parts.length ? parts.join(' · ') : 'No recipients selected yet'
    }, [
        useGlobal,
        selectedUsers,
        selectedRoles,
        selectedProviderTypes,
        pregnancyStatus,
        fromAge,
        toAge,
    ])

    const onSubmit = async (data: NotificationFormValues) => {
        try {
            setPayloadError('')
            setRecipientError('')

            if (
                !useGlobal &&
                selectedUsers.length === 0 &&
                selectedRoles.length === 0 &&
                selectedProviderTypes.length === 0 &&
                !pregnancyStatus &&
                !fromAge.trim() &&
                !toAge.trim()
            ) {
                setRecipientError(
                    'Choose at least one audience (users, roles, provider types, pregnancy status, or age range), or turn on broadcast.'
                )
                return
            }

            const parsedFromAge = fromAge.trim() ? Number(fromAge) : undefined
            const parsedToAge = toAge.trim() ? Number(toAge) : undefined

            if (
                parsedFromAge !== undefined &&
                (!Number.isFinite(parsedFromAge) || parsedFromAge <= 0)
            ) {
                setRecipientError('From age must be a positive number.')
                return
            }

            if (
                parsedToAge !== undefined &&
                (!Number.isFinite(parsedToAge) || parsedToAge <= 0)
            ) {
                setRecipientError('To age must be a positive number.')
                return
            }

            let parsedPayload: Record<string, unknown> | undefined
            const normalizedPayload = payloadText.trim()
            if (normalizedPayload) {
                try {
                    const value = JSON.parse(normalizedPayload) as unknown
                    if (
                        value === null ||
                        Array.isArray(value) ||
                        typeof value !== 'object'
                    ) {
                        throw new Error('Payload must be a JSON object.')
                    }
                    parsedPayload = value as Record<string, unknown>
                } catch {
                    setPayloadError(
                        'Payload must be valid JSON (example: {"key":"value"}).'
                    )
                    return
                }
            }

            const payload: CreateCustomNotificationDto = {
                type: notificationType,
                title: data.title?.trim() || undefined,
                body: data.body?.trim() || undefined,
                payload: parsedPayload,
                global: useGlobal,
                user_ids: useGlobal
                    ? undefined
                    : selectedUsers.length > 0
                      ? selectedUsers.map((u) => u.id)
                      : undefined,
                roles: selectedRoles.length > 0 ? selectedRoles : undefined,
                provider_type:
                    selectedProviderTypes.length > 0
                        ? selectedProviderTypes
                        : undefined,
                pregnancy_status: pregnancyStatus || undefined,
                from_age: parsedFromAge,
                to_age: parsedToAge,
            }

            await createNotification(payload).unwrap()
            reset()
            setPayloadText('{}')
            setSelectedUsers([])
            setSelectedRoles([])
            setSelectedProviderTypes([])
            setPregnancyStatus('')
            setFromAge('')
            setToAge('')
            setUseGlobal(false)
            setRecipientError('')
            setPayloadError('')
            onSuccess?.()
        } catch (error) {
            const err =
                error instanceof Error
                    ? error
                    : new Error('Failed to create notification')
            onError?.(err)
        }
    }

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                <Alert
                    severity={useGlobal || recipientSummary !== 'No recipients selected yet' ? 'info' : 'warning'}
                    icon={<GroupsIcon />}
                    sx={{ borderRadius: 2 }}
                >
                    <Typography variant="body2" fontWeight={600}>
                        Audience preview
                    </Typography>
                    <Typography variant="body2">{recipientSummary}</Typography>
                </Alert>

                {recipientError ? (
                    <Alert severity="error" onClose={() => setRecipientError('')}>
                        {recipientError}
                    </Alert>
                ) : null}

                <Grid container spacing={3}>
                    <Grid item xs={12} lg={6}>
                        <SectionCard
                            title="Who receives this?"
                            subtitle="Pick users, roles, or filters"
                            icon={<GroupsIcon fontSize="small" />}
                            accentColor="primary.main"
                        >
                            <Stack spacing={2.5}>
                                <Paper
                                    variant="outlined"
                                    sx={{
                                        p: 2,
                                        borderRadius: 2,
                                        bgcolor: useGlobal
                                            ? (theme) =>
                                                  alpha(theme.palette.primary.main, 0.08)
                                            : 'background.paper',
                                        borderColor: useGlobal ? 'primary.main' : 'divider',
                                    }}
                                >
                                    <FormControlLabel
                                        control={
                                            <Switch
                                                checked={useGlobal}
                                                onChange={(e) =>
                                                    setUseGlobal(e.target.checked)
                                                }
                                                color="primary"
                                            />
                                        }
                                        label={
                                            <Box>
                                                <Typography fontWeight={600}>
                                                    Broadcast to everyone
                                                </Typography>
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                >
                                                    Send this notification to all users
                                                </Typography>
                                            </Box>
                                        }
                                    />
                                </Paper>

                                {!useGlobal ? (
                                    <>
                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Specific users
                                            </Typography>
                                            <Autocomplete
                                                multiple
                                                options={users}
                                                loading={loadingUsers}
                                                value={selectedUsers}
                                                onChange={(_, value) =>
                                                    setSelectedUsers(value)
                                                }
                                                getOptionLabel={(option) => option.name}
                                                isOptionEqualToValue={(a, b) =>
                                                    a.id === b.id
                                                }
                                                renderTags={(value, getTagProps) =>
                                                    value.map((option, index) => (
                                                        <Chip
                                                            {...getTagProps({ index })}
                                                            key={option.id}
                                                            label={option.name}
                                                            color="primary"
                                                            size="small"
                                                        />
                                                    ))
                                                }
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        placeholder="Search and select users"
                                                        size="small"
                                                    />
                                                )}
                                            />
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Roles
                                            </Typography>
                                            <ToggleButtonGroup
                                                value={selectedRoles}
                                                onChange={(_, value) =>
                                                    setSelectedRoles(value ?? [])
                                                }
                                                aria-label="roles"
                                                size="small"
                                                sx={{
                                                    flexWrap: 'wrap',
                                                    gap: 1,
                                                    '& .MuiToggleButtonGroup-grouped': {
                                                        borderRadius: '8px !important',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        mx: 0,
                                                    },
                                                }}
                                            >
                                                {USER_ROLES.map((role) => (
                                                    <ToggleButton
                                                        key={role}
                                                        value={role}
                                                        sx={{
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            px: 2,
                                                            '&.Mui-selected': {
                                                                bgcolor: 'primary.main',
                                                                color: 'primary.contrastText',
                                                                '&:hover': {
                                                                    bgcolor: 'primary.dark',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {role}
                                                    </ToggleButton>
                                                ))}
                                            </ToggleButtonGroup>
                                        </Box>

                                        <Box>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                Provider types
                                            </Typography>
                                            <ToggleButtonGroup
                                                value={selectedProviderTypes}
                                                onChange={(_, value) =>
                                                    setSelectedProviderTypes(value ?? [])
                                                }
                                                aria-label="provider types"
                                                size="small"
                                                sx={{
                                                    flexWrap: 'wrap',
                                                    gap: 1,
                                                    '& .MuiToggleButtonGroup-grouped': {
                                                        borderRadius: '8px !important',
                                                        border: '1px solid',
                                                        borderColor: 'divider',
                                                        mx: 0,
                                                    },
                                                }}
                                            >
                                                {PROVIDER_TYPES.map((providerType) => (
                                                    <ToggleButton
                                                        key={providerType}
                                                        value={providerType}
                                                        sx={{
                                                            textTransform: 'none',
                                                            fontWeight: 600,
                                                            px: 2,
                                                            '&.Mui-selected': {
                                                                bgcolor: 'secondary.main',
                                                                color: 'secondary.contrastText',
                                                                '&:hover': {
                                                                    bgcolor: 'secondary.dark',
                                                                },
                                                            },
                                                        }}
                                                    >
                                                        {providerType}
                                                    </ToggleButton>
                                                ))}
                                            </ToggleButtonGroup>
                                            <Typography
                                                variant="caption"
                                                color="text.secondary"
                                                display="block"
                                                sx={{ mt: 1 }}
                                            >
                                                Click again to turn a type off.
                                            </Typography>
                                        </Box>
                                    </>
                                ) : null}

                                <Divider />

                                <Box>
                                    <Stack
                                        direction="row"
                                        spacing={1}
                                        alignItems="center"
                                        mb={1.5}
                                    >
                                        <FilterListIcon
                                            fontSize="small"
                                            color="action"
                                        />
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                        >
                                            Optional audience filters
                                        </Typography>
                                    </Stack>
                                    <Stack spacing={2}>
                                        <TextField
                                            select
                                            label="Pregnancy status"
                                            size="small"
                                            fullWidth
                                            value={pregnancyStatus}
                                            onChange={(e) =>
                                                setPregnancyStatus(
                                                    e.target.value as
                                                        | PregnancyStatus
                                                        | ''
                                                )
                                            }
                                        >
                                            <MenuItem value="">Any</MenuItem>
                                            {PREGNANCY_STATUSES.map((status) => (
                                                <MenuItem key={status} value={status}>
                                                    {status}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <Stack direction="row" spacing={1.5}>
                                            <TextField
                                                label="From age"
                                                type="number"
                                                size="small"
                                                fullWidth
                                                inputProps={{ min: 1 }}
                                                value={fromAge}
                                                onChange={(e) =>
                                                    setFromAge(e.target.value)
                                                }
                                            />
                                            <TextField
                                                label="To age"
                                                type="number"
                                                size="small"
                                                fullWidth
                                                inputProps={{ min: 1 }}
                                                value={toAge}
                                                onChange={(e) =>
                                                    setToAge(e.target.value)
                                                }
                                            />
                                        </Stack>
                                    </Stack>
                                </Box>
                            </Stack>
                        </SectionCard>
                    </Grid>

                    <Grid item xs={12} lg={6}>
                        <SectionCard
                            title="Notification content"
                            subtitle="Title, message, and type"
                            icon={<NotificationsActiveIcon fontSize="small" />}
                            accentColor="secondary.main"
                        >
                            <Stack spacing={2}>
                                <Controller
                                    name="type"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            select
                                            label="Notification type"
                                            fullWidth
                                            size="small"
                                            error={!!errors.type}
                                            helperText={errors.type?.message}
                                        >
                                            {NOTIFICATION_TYPES.map((type) => (
                                                <MenuItem key={type} value={type}>
                                                    {type.replace(/_/g, ' ')}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                    )}
                                />

                                <Controller
                                    name="title"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Title"
                                            placeholder="e.g. Appointment reminder"
                                            fullWidth
                                            size="small"
                                        />
                                    )}
                                />

                                <Controller
                                    name="body"
                                    control={control}
                                    render={({ field }) => (
                                        <TextField
                                            {...field}
                                            label="Message"
                                            placeholder="Write the notification message users will see..."
                                            fullWidth
                                            multiline
                                            minRows={4}
                                        />
                                    )}
                                />

                                <TextField
                                    label="Custom payload (JSON)"
                                    placeholder='{"key": "value"}'
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    value={payloadText}
                                    onChange={(e) =>
                                        setPayloadText(e.target.value)
                                    }
                                    error={!!payloadError}
                                    helperText={
                                        payloadError ||
                                        'Optional extra data sent with the notification.'
                                    }
                                    sx={{
                                        '& .MuiInputBase-input': {
                                            fontFamily: 'monospace',
                                            fontSize: 13,
                                        },
                                    }}
                                />

                                <Chip
                                    label={`Type: ${notificationType.replace(/_/g, ' ')}`}
                                    color="secondary"
                                    variant="outlined"
                                    size="small"
                                    sx={{ alignSelf: 'flex-start' }}
                                />
                            </Stack>
                        </SectionCard>
                    </Grid>
                </Grid>

                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        borderRadius: 2,
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexWrap: 'wrap',
                        gap: 2,
                        bgcolor: (theme) => alpha(theme.palette.primary.main, 0.04),
                    }}
                >
                    <Stack direction="row" spacing={1.5} alignItems="center">
                        <CampaignIcon color="primary" />
                        <Box>
                            <Typography fontWeight={600}>
                                Ready to send?
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Review your audience and message, then send.
                            </Typography>
                        </Box>
                    </Stack>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        disabled={loading}
                        startIcon={<SendIcon />}
                        sx={{
                            px: 3,
                            borderRadius: 2,
                            fontWeight: 700,
                            boxShadow: 2,
                        }}
                    >
                        {loading ? 'Sending…' : 'Send notification'}
                    </Button>
                </Paper>
            </Stack>
        </Box>
    )
}
