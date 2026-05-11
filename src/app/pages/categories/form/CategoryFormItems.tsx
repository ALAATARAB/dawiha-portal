import { Stack, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

import { type FormItemsProps } from '../../../components/crud-template/crud-form/constant'
import { type CategoryFormValues } from '../constant'

const CategoryFormItems = ({
    control,
    isView,
}: FormItemsProps<CategoryFormValues>) => {
    return (
        <Stack spacing={2}>
            <Typography variant="subtitle1">Category</Typography>
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
        </Stack>
    )
}

export default CategoryFormItems
