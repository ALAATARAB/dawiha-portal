import { Select, MenuItem, FormControl, InputLabel } from '@mui/material'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { Controller } from 'react-hook-form'

import {
    userAccountStatus,
    type UserEntity,
} from '../../../common/entities/user/user.entity'
import { userGender } from '../../../common/entities/user/user.entity'
import { type FormItemsProps } from '../../../components/crud-template/crud-form/constant'
import ImageUploader from '../../../components/image-uploader/ImageUploader'

const UserFormItems = ({ control, isView }: FormItemsProps<UserEntity>) => {
    return (
        <Stack spacing={2}>
            <Typography variant="subtitle1">Profile Picture</Typography>
            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <ImageUploader
                        width="120px"
                        height="120px"
                        isDisabled={isView}
                        value={(field.value?.url as string) ?? null}
                        onChange={field.onChange}
                    />
                )}
            />
            <Controller
                name="firstName"
                control={control}
                rules={{ required: 'First name is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="First Name"
                        disabled={isView}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="lastName"
                control={control}
                rules={{ required: 'Last name is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Last Name"
                        disabled={isView}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            {/* User Account Status Field */}
            <Controller
                name="status"
                control={control}
                render={({ field, fieldState }) => (
                    <FormControl
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                    >
                        <InputLabel id="status-label">Status</InputLabel>
                        <Select
                            {...field}
                            labelId="status-label"
                            label="Status"
                            disabled={isView}
                        >
                            {userAccountStatus.options.map((option: string) => (
                                <MenuItem key={option} value={option}>
                                    {option.charAt(0) +
                                        option.slice(1).toLowerCase()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            {/* Gender Field */}
            <Controller
                name="gender"
                control={control}
                render={({ field, fieldState }) => (
                    <FormControl
                        fullWidth
                        size="small"
                        error={!!fieldState.error}
                    >
                        <InputLabel id="gender-label">Gender</InputLabel>
                        <Select
                            {...field}
                            labelId="gender-label"
                            label="Gender"
                            disabled={isView}
                        >
                            {userGender.options.map((option: string) => (
                                <MenuItem key={option} value={option}>
                                    {option.charAt(0) +
                                        option.slice(1).toLowerCase()}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            />
            {/* Date of Birth Field */}
            <Controller
                name="birthday"
                control={control}
                render={({ field, fieldState }) => (
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            label="Date of Birth"
                            value={field.value ? new Date(field.value) : null}
                            onChange={field.onChange}
                            disabled={isView}
                            slotProps={{
                                textField: {
                                    fullWidth: true,
                                    size: 'small',
                                    error: !!fieldState.error,
                                    helperText: fieldState.error?.message,
                                },
                            }}
                        />
                    </LocalizationProvider>
                )}
            />
        </Stack>
    )
}

export default UserFormItems
