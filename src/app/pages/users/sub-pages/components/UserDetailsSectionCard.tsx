import { alpha, Box, Paper, Stack, Typography } from '@mui/material'
import React from 'react'

type UserDetailsSectionCardProps = {
    title: string
    subtitle?: string
    icon: React.ReactNode
    accentColor: string
    action?: React.ReactNode
    children: React.ReactNode
}

const UserDetailsSectionCard: React.FC<UserDetailsSectionCardProps> = ({
    title,
    subtitle,
    icon,
    accentColor,
    action,
    children,
}) => (
    <Paper
        elevation={0}
        sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            overflow: 'hidden',
            height: '100%',
        }}
    >
        <Box
            sx={{
                px: 2.5,
                py: 2,
                bgcolor: accentColor,
                color: '#fff',
            }}
        >
            <Stack
                direction="row"
                spacing={1.5}
                alignItems="center"
                justifyContent="space-between"
            >
                <Stack direction="row" spacing={1.5} alignItems="center">
                    <Box
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: 1.5,
                            display: 'grid',
                            placeItems: 'center',
                            bgcolor: alpha('#fff', 0.18),
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" fontWeight={700}>
                            {title}
                        </Typography>
                        {subtitle && (
                            <Typography variant="caption" sx={{ opacity: 0.9 }}>
                                {subtitle}
                            </Typography>
                        )}
                    </Box>
                </Stack>
                {action}
            </Stack>
        </Box>
        <Box sx={{ p: 2 }}>{children}</Box>
    </Paper>
)

export default UserDetailsSectionCard
