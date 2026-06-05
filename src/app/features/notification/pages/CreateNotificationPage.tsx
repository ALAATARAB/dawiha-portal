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
import type { CreateCustomNotificationDto, NotificationType, UserRole } from '../../../common/dtos/notification/create-custom-notification.dto'

const notificationTypes: NotificationType[] = [
    'CUSTOM',
    'APPOINTMENT_CREATED',
    'APPOINTMENT_UPDATED',
    'REQUEST_CREATED',
    'REQUEST_UPDATED',
]

const userRoles: UserRole[] = ['USER', 'PROVIDER', 'ADMIN']

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
                        </>
                    )}

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
