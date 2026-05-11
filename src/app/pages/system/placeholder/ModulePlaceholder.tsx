import { Box, Paper, Typography } from '@mui/material'

type ModulePlaceholderProps = {
    title: string
    description?: string
}

export default function ModulePlaceholder({
    title,
    description = 'This module is planned in the Dawiha PRD and will be implemented in a later iteration.',
}: ModulePlaceholderProps) {
    return (
        <Box sx={{ py: 2 }}>
            <Paper variant="outlined" sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography color="text.secondary">{description}</Typography>
            </Paper>
        </Box>
    )
}
