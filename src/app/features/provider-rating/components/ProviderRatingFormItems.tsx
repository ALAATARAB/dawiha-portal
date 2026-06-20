import { MenuItem, Stack, TextField } from '@mui/material'
import { Controller, type Control } from 'react-hook-form'

export type ProviderRatingFormValues = {
    id: number
    stars: number
}

type ProviderRatingFormItemsProps = {
    control: Control<ProviderRatingFormValues>
    isView: boolean
}

const STAR_OPTIONS = [1, 2, 3, 4, 5]

export default function ProviderRatingFormItems({
    control,
    isView,
}: ProviderRatingFormItemsProps) {
    return (
        <Stack spacing={2}>
            <Controller
            name="stars"
            control={control}
            rules={{
                required: 'Stars is required',
                min: { value: 1, message: 'Minimum rating is 1' },
                max: { value: 5, message: 'Maximum rating is 5' },
            }}
            render={({ field, fieldState }) => (
                <TextField
                    {...field}
                    select
                    label="Stars"
                    fullWidth
                    disabled={isView}
                    error={!!fieldState.error}
                    helperText={fieldState.error?.message}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                >
                    {STAR_OPTIONS.map((star) => (
                        <MenuItem key={star} value={star}>
                            {star} {star === 1 ? 'star' : 'stars'}
                        </MenuItem>
                    ))}
                </TextField>
            )}
        />
        </Stack>
    )
}
