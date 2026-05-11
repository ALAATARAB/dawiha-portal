import { Stack, TextField, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

import { type FormItemsProps } from '../../../components/crud-template/crud-form/constant'
import ImageUploader from '../../../components/image-uploader/ImageUploader'

export interface PregnancyStageFormValues {
    id?: number
    title: string
    week_number: number
    description?: string
    medical_advice?: string
    image_id?: number
    image?: { id: number; url: string } | null
}

const PregnancyStageFormItems = ({
    control,
    isView,
}: FormItemsProps<PregnancyStageFormValues>) => {
    return (
        <Stack spacing={2}>
            <Typography variant="subtitle1">Pregnancy Stage Information</Typography>

            <Controller
                name="image"
                control={control}
                render={({ field }) => (
                    <ImageUploader
                        width="120px"
                        height="120px"
                        purpose="PREGNANCY_STAGE_IMAGE"
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
                name="week_number"
                control={control}
                rules={{
                    required: 'Week number is required',
                    min: { value: 1, message: 'Week must be at least 1' },
                    max: { value: 42, message: 'Week must be at most 42' },
                }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Week Number"
                        type="number"
                        disabled={isView}
                        fullWidth
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        inputProps={{ min: 1, max: 42 }}
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
                name="medical_advice"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        value={field.value ?? ''}
                        label="Medical Advice (JSON format)"
                        disabled={isView}
                        fullWidth
                        multiline
                        minRows={4}
                        helperText="Enter medical advice in JSON format or plain text"
                    />
                )}
            />
        </Stack>
    )
}

export default PregnancyStageFormItems
