import { Stack, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

import { type FormItemsProps } from '../../../components/crud-template/crud-form/constant'
import ImageUploader from '../../../components/image-uploader/ImageUploader'

export interface MedicineGuideFormValues {
    id?: number
    title: string
    description?: string
    uses?: string
    warnings?: string
    how_to_use?: string
    main_info?: string
    image_id?: number
    image?: { id: number; url: string } | null
}

const MedicineGuideFormItems = ({
    control,
    isView,
}: FormItemsProps<MedicineGuideFormValues>) => {
    return (
        <Stack spacing={2}>
            <Typography variant="subtitle1">Medicine Guide Information</Typography>

            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <ImageUploader
                        width="120px"
                        height="120px"
                        purpose="MEDICINE_GUIDE_IMAGE"
                        valueMode="media"
                        isDisabled={isView}
                        value={
                            field.value != null &&
                            typeof field.value === 'object' &&
                            'url' in field.value
                                ? (field.value.url as string)
                                : null
                        }
                        onChange={field.onChange}
                    />
                )}
            />

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

            <Controller
                name="uses"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Uses"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={3}
                        helperText="Describe what this medicine is used for"
                    />
                )}
            />

            <Controller
                name="how_to_use"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="How to Use"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={3}
                        helperText="Instructions on how to use this medicine"
                    />
                )}
            />

            <Controller
                name="warnings"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Warnings"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={3}
                        helperText="Important warnings and precautions"
                    />
                )}
            />

            <Controller
                name="main_info"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Main Information"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={3}
                        helperText="Main information about this medicine"
                    />
                )}
            />
        </Stack>
    )
}

export default MedicineGuideFormItems
