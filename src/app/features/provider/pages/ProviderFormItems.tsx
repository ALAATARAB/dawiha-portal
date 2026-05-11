import { Stack, TextField, Typography, MenuItem, Chip, Box } from '@mui/material'
import { Controller } from 'react-hook-form'

import { type FormItemsProps } from '../../../components/crud-template/crud-form/constant'
import { type ProviderEntity, type ProviderType } from '../../../common/entities/provider/provider.entity'

const PROVIDER_TYPES: ProviderType[] = ['DOCTOR', 'NURSE', 'CLINIC', 'HOSPITAL']

const ProviderFormItems = ({
    control,
    isView,
}: FormItemsProps<ProviderEntity>) => {
    return (
        <Stack spacing={2}>
            <Typography variant="subtitle1">Provider Information</Typography>
            
            <Controller
                name="title"
                control={control}
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Title"
                        disabled={isView}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />

            <Controller
                name="type"
                control={control}
                rules={{ required: 'Type is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Type"
                        disabled={isView}
                        fullWidth
                        select
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    >
                        {PROVIDER_TYPES.map((type) => (
                            <MenuItem key={type} value={type}>
                                {type}
                            </MenuItem>
                        ))}
                    </TextField>
                )}
            />

            <Controller
                name="about"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="About"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={2}
                    />
                )}
            />

            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Description"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={3}
                    />
                )}
            />

            <Controller
                name="booking_fees"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Booking Fees"
                        disabled={isView}
                        fullWidth
                        type="number"
                        inputProps={{ min: 0, step: 0.01 }}
                    />
                )}
            />

            <Typography variant="subtitle2" sx={{ mt: 2 }}>Location</Typography>

            <Box sx={{ display: 'flex', gap: 2 }}>
                <Controller
                    name="lat"
                    control={control}
                    rules={{ required: 'Latitude is required' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ''}
                            label="Latitude"
                            disabled={isView}
                            fullWidth
                            type="number"
                            inputProps={{ step: 'any' }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />

                <Controller
                    name="lng"
                    control={control}
                    rules={{ required: 'Longitude is required' }}
                    render={({ field, fieldState }) => (
                        <TextField
                            {...field}
                            value={field.value ?? ''}
                            label="Longitude"
                            disabled={isView}
                            fullWidth
                            type="number"
                            inputProps={{ step: 'any' }}
                            error={!!fieldState.error}
                            helperText={fieldState.error?.message}
                        />
                    )}
                />
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 2 }}>Contact Information</Typography>

            <Controller
                name="phone_numbers"
                control={control}
                render={({ field }) => (
                    <Box>
                        <TextField
                            value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                            onChange={(e) => {
                                const phones = e.target.value
                                    .split(',')
                                    .map(p => p.trim())
                                    .filter(p => p !== '')
                                field.onChange(phones)
                            }}
                            label="Phone Numbers (comma separated)"
                            disabled={isView}
                            fullWidth
                            placeholder="e.g., +1234567890, +0987654321"
                        />
                        {Array.isArray(field.value) && field.value.length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {field.value.map((phone, index) => (
                                    <Chip key={index} label={phone} size="small" />
                                ))}
                            </Box>
                        )}
                    </Box>
                )}
            />

            <Controller
                name="categories"
                control={control}
                render={({ field }) => (
                    <Box>
                        <TextField
                            value={Array.isArray(field.value) ? field.value.join(', ') : ''}
                            onChange={(e) => {
                                const cats = e.target.value
                                    .split(',')
                                    .map(c => c.trim())
                                    .filter(c => c !== '')
                                field.onChange(cats)
                            }}
                            label="Categories (comma separated)"
                            disabled={isView}
                            fullWidth
                            placeholder="e.g., Cardiology, Pediatrics"
                        />
                        {Array.isArray(field.value) && field.value.length > 0 && (
                            <Box sx={{ mt: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {field.value.map((category, index) => (
                                    <Chip key={index} label={category} size="small" color="primary" />
                                ))}
                            </Box>
                        )}
                    </Box>
                )}
            />

            {isView && (
                <>
                    <Typography variant="subtitle2" sx={{ mt: 2 }}>System Information</Typography>
                    
                    <Controller
                        name="user_id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ''}
                                label="User ID"
                                disabled
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="id"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                value={field.value ?? ''}
                                label="Provider ID"
                                disabled
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="created_at"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value ? new Date(field.value).toLocaleString() : ''}
                                label="Created At"
                                disabled
                                fullWidth
                            />
                        )}
                    />

                    <Controller
                        name="updated_at"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                value={field.value ? new Date(field.value).toLocaleString() : ''}
                                label="Updated At"
                                disabled
                                fullWidth
                            />
                        )}
                    />
                </>
            )}
        </Stack>
    )
}

export default ProviderFormItems
