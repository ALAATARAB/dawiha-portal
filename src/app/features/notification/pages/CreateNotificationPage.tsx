import {
    Box,
    Paper,
    Typography,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Checkbox,
    Chip,
    CircularProgress,
} from '@mui/material'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCreateCustomNotificationMutation } from '../api/notificationApiSlice'
import type {
    CreateCustomNotificationDto,
    NotificationType,
    PregnancyStatus,
    UserRole,
} from '../../../common/dtos/notification/create-custom-notification.dto'
import type { ProviderType } from '../../../common/entities/provider/provider.entity'

const notificationTypes: NotificationType[] = [
    'CUSTOM',
    'APPOINTMENT_CREATED',
    'APPOINTMENT_UPDATED',
    'REQUEST_CREATED',
    'REQUEST_UPDATED',
]

const userRoles: UserRole[] = ['USER', 'PROVIDER', 'ADMIN']
const providerTypes: ProviderType[] = ['DOCTOR', 'NURSE', 'CLINIC', 'HOSPITAL']
const pregnancyStatuses: PregnancyStatus[] = ['ACTIVE', 'CANCELED', 'DONE']

export const CreateNotificationPage = () => {
    const navigate = useNavigate()
    const [createNotification, { isLoading }] = useCreateCustomNotificationMutation()

    const [formData, setFormData] = useState<CreateCustomNotificationDto>({
        type: 'CUSTOM',
        title: '',
        body: '',
        user_ids: [],
        roles: [],
        global: false,
        payload: undefined,
    })

    const [userIdInput, setUserIdInput] = useState('')

    const handleChange = (field: keyof CreateCustomNotificationDto, value: any) => {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    const handleAddUserId = () => {
        const id = parseInt(userIdInput)
        if (!isNaN(id) && id > 0 && !formData.user_ids?.includes(id)) {
            setFormData((prev) => ({
                ...prev,
                user_ids: [...(prev.user_ids || []), id],
            }))
            setUserIdInput('')
        }
    }

    const handleRemoveUserId = (id: number) => {
        setFormData((prev) => ({
            ...prev,
            user_ids: prev.user_ids?.filter((uid) => uid !== id),
        }))
    }

    const handleToggleRole = (role: UserRole) => {
        const currentRoles = formData.roles || []
        if (currentRoles.includes(role)) {
            handleChange(
                'roles',
                currentRoles.filter((r) => r !== role)
            )
        } else {
            handleChange('roles', [...currentRoles, role])
        }
    }

    const handleToggleProviderType = (providerType: ProviderType) => {
        const currentTypes = formData.provider_type || []
        if (currentTypes.includes(providerType)) {
            handleChange(
                'provider_type',
                currentTypes.filter((type) => type !== providerType)
            )
        } else {
            handleChange('provider_type', [...currentTypes, providerType])
        }
    }

    const handleSubmit = async () => {
        try {
            const submitData: CreateCustomNotificationDto = {
                type: formData.type,
                global: formData.global,
            }

            if (formData.title) submitData.title = formData.title
            if (formData.body) submitData.body = formData.body
            if (formData.user_ids && formData.user_ids.length > 0) {
                submitData.user_ids = formData.user_ids
            }
            if (formData.roles && formData.roles.length > 0) {
                submitData.roles = formData.roles
            }
            if (formData.provider_type && formData.provider_type.length > 0) {
                submitData.provider_type = formData.provider_type
            }
            if (formData.pregnancy_status) {
                submitData.pregnancy_status = formData.pregnancy_status
            }
            if (formData.from_age) submitData.from_age = formData.from_age
            if (formData.to_age) submitData.to_age = formData.to_age
            if (formData.payload) submitData.payload = formData.payload

            await createNotification(submitData).unwrap()
            navigate('/notifications')
        } catch (error) {
            console.error('Failed to create notification:', error)
        }
    }

    return (
        <Box sx={{ p: 3 }}>
            <Paper sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
                <Typography variant="h5" gutterBottom>
                    Create Custom Notification
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 3 }}>
                    <TextField
                        select
                        label="Notification Type"
                        value={formData.type}
                        onChange={(e) =>
                            handleChange('type', e.target.value as NotificationType)
                        }
                        required
                        fullWidth
                    >
                        {notificationTypes.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>

                    <TextField
                        label="Title"
                        value={formData.title}
                        onChange={(e) => handleChange('title', e.target.value)}
                        fullWidth
                    />

                    <TextField
                        label="Body"
                        value={formData.body}
                        onChange={(e) => handleChange('body', e.target.value)}
                        multiline
                        rows={4}
                        fullWidth
                    />

                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formData.global}
                                onChange={(e) =>
                                    handleChange('global', e.target.checked)
                                }
                            />
                        }
                        label="Send to all users (Global)"
                    />

                    {!formData.global && (
                        <>
                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Target User IDs
                                </Typography>
                                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                                    <TextField
                                        label="User ID"
                                        type="number"
                                        value={userIdInput}
                                        onChange={(e) => setUserIdInput(e.target.value)}
                                        size="small"
                                        onKeyPress={(e) => {
                                            if (e.key === 'Enter') {
                                                handleAddUserId()
                                            }
                                        }}
                                    />
                                    <Button
                                        variant="outlined"
                                        onClick={handleAddUserId}
                                    >
                                        Add
                                    </Button>
                                </Box>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {formData.user_ids?.map((id) => (
                                        <Chip
                                            key={id}
                                            label={`User #${id}`}
                                            onDelete={() => handleRemoveUserId(id)}
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Target Roles
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {userRoles.map((role) => (
                                        <Chip
                                            key={role}
                                            label={role}
                                            onClick={() => handleToggleRole(role)}
                                            color={
                                                formData.roles?.includes(role)
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            variant={
                                                formData.roles?.includes(role)
                                                    ? 'filled'
                                                    : 'outlined'
                                            }
                                        />
                                    ))}
                                </Box>
                            </Box>

                            <Box>
                                <Typography variant="subtitle2" gutterBottom>
                                    Target Provider Types
                                </Typography>
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                    {providerTypes.map((providerType) => (
                                        <Chip
                                            key={providerType}
                                            label={providerType}
                                            onClick={() => handleToggleProviderType(providerType)}
                                            color={
                                                formData.provider_type?.includes(providerType)
                                                    ? 'primary'
                                                    : 'default'
                                            }
                                            variant={
                                                formData.provider_type?.includes(providerType)
                                                    ? 'filled'
                                                    : 'outlined'
                                            }
                                        />
                                    ))}
                                </Box>
                            </Box>
                        </>
                    )}

                    <TextField
                        select
                        label="Pregnancy Status Filter"
                        value={formData.pregnancy_status || ''}
                        onChange={(e) =>
                            handleChange(
                                'pregnancy_status',
                                (e.target.value || undefined) as PregnancyStatus | undefined
                            )
                        }
                        fullWidth
                    >
                        <MenuItem value="">Any</MenuItem>
                        {pregnancyStatuses.map((status) => (
                            <MenuItem key={status} value={status}>
                                {status}
                            </MenuItem>
                        ))}
                    </TextField>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <TextField
                            label="From Age"
                            type="number"
                            value={formData.from_age ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'from_age',
                                    e.target.value ? Number(e.target.value) : undefined
                                )
                            }
                            fullWidth
                        />
                        <TextField
                            label="To Age"
                            type="number"
                            value={formData.to_age ?? ''}
                            onChange={(e) =>
                                handleChange(
                                    'to_age',
                                    e.target.value ? Number(e.target.value) : undefined
                                )
                            }
                            fullWidth
                        />
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end', mt: 2 }}>
                        <Button
                            onClick={() => navigate('/notifications')}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        <Button
                            onClick={handleSubmit}
                            variant="contained"
                            disabled={isLoading}
                            startIcon={isLoading && <CircularProgress size={20} />}
                        >
                            Send Notification
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    )
}

export default CreateNotificationPage
