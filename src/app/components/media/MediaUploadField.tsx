import { Avatar, Box, TextField, Typography } from '@mui/material'
import { useState } from 'react'

import { useGetMediaQuery } from '../../features/media/api/mediaApiSlice'

interface MediaUploadFieldProps {
    value?: number
    onChange: (mediaId: number | undefined) => void
    label?: string
}

export const MediaUploadField = ({
    value,
    onChange,
    label = 'Media',
}: MediaUploadFieldProps) => {
    const [mediaId, setMediaId] = useState<string>(value?.toString() || '')
    const { data: media } = useGetMediaQuery(value as number, {
        skip: !value,
    })

    const handleMediaIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setMediaId(newValue)
        const parsed = parseInt(newValue)
        if (!isNaN(parsed) && parsed > 0) {
            onChange(parsed)
        } else if (newValue === '') {
            onChange(undefined)
        }
    }

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            <Typography variant="body2" color="text.secondary">
                {label}
            </Typography>
            <TextField
                label="Media ID"
                type="number"
                value={mediaId}
                onChange={handleMediaIdChange}
                fullWidth
                size="small"
                helperText="Enter the ID of an uploaded media file"
            />
            {media && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Avatar
                        src={media.url}
                        variant="rounded"
                        sx={{ width: 80, height: 80 }}
                    />
                    <Typography variant="caption" color="text.secondary">
                        {media.title}
                    </Typography>
                </Box>
            )}
        </Box>
    )
}
