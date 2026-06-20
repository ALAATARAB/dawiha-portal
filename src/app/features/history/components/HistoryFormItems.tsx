import { Checkbox, FormControlLabel, MenuItem, Stack, TextField } from '@mui/material'
import { Controller, type Control } from 'react-hook-form'

import type { HistoryType } from '../../../common/entities/history/history.entity'

export type HistoryFormValues = {
    id: number
    type: HistoryType
    title: string
    consistent: boolean
    description?: string
}

type HistoryFormItemsProps = {
    control: Control<HistoryFormValues>
    isView: boolean
}

const HISTORY_TYPES: HistoryType[] = [
    'MEDICAL_RECORD',
    'PREGNANCY_HISTORY',
    'SURGERY_HISTORY',
    'ALLERGY_HISTORY',
    'MEDICATION_HISTORY',
    'FAMILY_HISTORY',
]

export default function HistoryFormItems({ control, isView }: HistoryFormItemsProps) {
    return (
        <Stack spacing={2}>
            <Controller
                name="type"
                control={control}
                rules={{ required: 'Type is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        select
                        label="Type"
                        fullWidth
                        disabled={isView}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    >
                        {HISTORY_TYPES.map((type) => (
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
                rules={{ required: 'Title is required' }}
                render={({ field, fieldState }) => (
                    <TextField
                        {...field}
                        label="Title"
                        fullWidth
                        disabled={isView}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                    />
                )}
            />
            <Controller
                name="consistent"
                control={control}
                render={({ field }) => (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={!!field.value}
                                onChange={(e) => field.onChange(e.target.checked)}
                                disabled={isView}
                            />
                        }
                        label="Consistent"
                    />
                )}
            />
            <Controller
                name="description"
                control={control}
                render={({ field }) => (
                    <TextField
                        {...field}
                        label="Description"
                        fullWidth
                        multiline
                        rows={3}
                        disabled={isView}
                    />
                )}
            />
        </Stack>
    )
}
