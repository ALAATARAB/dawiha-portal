import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import BadgeIcon from '@mui/icons-material/Badge'
import CakeIcon from '@mui/icons-material/Cake'
import PhoneIcon from '@mui/icons-material/Phone'
import VerifiedIcon from '@mui/icons-material/Verified'
import WcIcon from '@mui/icons-material/Wc'
import {
    Avatar,
    Box,
    Chip,
    Grid,
    IconButton,
    Paper,
    Stack,
    Tooltip,
    Typography,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { AdminUserEntity } from '../../../../common/entities/user/user.entity'

type UserDetailsDisplayProps = {
    user: AdminUserEntity
}

const roleColors: Record<
    AdminUserEntity['role'],
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = {
    ADMIN: 'error',
    USER: 'primary',
    PROVIDER: 'success',
}

const InfoTile: React.FC<{
    icon: React.ReactNode
    label: string
    value: React.ReactNode
}> = ({ icon, label, value }) => (
    <Box
        sx={{
            p: 2,
            borderRadius: 2,
            bgcolor: 'action.hover',
            height: '100%',
        }}
    >
        <Stack direction="row" spacing={1.5} alignItems="flex-start">
            <Box sx={{ color: 'primary.main', mt: 0.25 }}>{icon}</Box>
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" color="text.secondary" display="block">
                    {label}
                </Typography>
                <Typography variant="body1" fontWeight={600} sx={{ wordBreak: 'break-word' }}>
                    {value}
                </Typography>
            </Box>
        </Stack>
    </Box>
)

const UserDetailsDisplay: React.FC<UserDetailsDisplayProps> = ({ user }) => {
    const phone = `${user.countryCode} ${user.phoneNumber}`

    return (
        <Box sx={{ width: '100%', position: 'relative', mt: 2, mb: 3 }}>
            <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
                <Tooltip title="Back to users">
                    <IconButton
                        component={RouterLink}
                        to="/users"
                        size="small"
                        sx={{ bgcolor: 'background.paper', boxShadow: 1 }}
                    >
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">
                    Users / <strong>{user.fullName}</strong>
                </Typography>
            </Stack>

            <Avatar
                alt={user.fullName}
                sx={{
                    width: 112,
                    height: 112,
                    borderRadius: 3,
                    border: '4px solid',
                    borderColor: 'background.paper',
                    position: 'absolute',
                    top: 48,
                    left: { xs: '50%', md: 48 },
                    transform: { xs: 'translateX(-50%)', md: 'none' },
                    background: (theme) =>
                        `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: 4,
                    zIndex: 2,
                    fontSize: '2.75rem',
                    fontWeight: 700,
                }}
                variant="rounded"
            >
                {user.fullName.charAt(0).toUpperCase()}
            </Avatar>

            <Paper
                sx={{
                    width: '100%',
                    overflow: 'hidden',
                    borderRadius: 3,
                    border: '1px solid',
                    borderColor: 'divider',
                }}
                elevation={0}
            >
                <Box
                    sx={{
                        height: 88,
                        background: (theme) =>
                            `linear-gradient(120deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                    }}
                />

                <Box
                    sx={{
                        px: { xs: 2, md: 4 },
                        pt: { xs: 8, md: 3 },
                        pb: 3,
                        pl: { xs: 2, md: 22 },
                    }}
                >
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing={1}
                        alignItems={{ xs: 'center', sm: 'flex-start' }}
                        justifyContent="space-between"
                        sx={{ mb: 3 }}
                    >
                        <Box sx={{ textAlign: { xs: 'center', sm: 'left' } }}>
                            <Typography variant="h4" fontWeight={700} gutterBottom>
                                {user.fullName}
                            </Typography>
                            <Stack
                                direction="row"
                                spacing={1}
                                flexWrap="wrap"
                                useFlexGap
                                justifyContent={{ xs: 'center', sm: 'flex-start' }}
                            >
                                <Chip
                                    label={user.role}
                                    size="small"
                                    color={roleColors[user.role]}
                                />
                                <Chip
                                    icon={
                                        user.isVerified ? (
                                            <VerifiedIcon sx={{ fontSize: 16 }} />
                                        ) : undefined
                                    }
                                    label={
                                        user.isVerified ? 'Verified' : 'Not verified'
                                    }
                                    size="small"
                                    color={user.isVerified ? 'success' : 'default'}
                                    variant={user.isVerified ? 'filled' : 'outlined'}
                                />
                                <Chip
                                    label={`ID #${user.id}`}
                                    size="small"
                                    variant="outlined"
                                />
                            </Stack>
                        </Box>

                        <Typography variant="caption" color="text.secondary">
                            Member since{' '}
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString(undefined, {
                                      year: 'numeric',
                                      month: 'long',
                                      day: 'numeric',
                                  })
                                : '—'}
                        </Typography>
                    </Stack>

                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InfoTile
                                icon={<PhoneIcon fontSize="small" />}
                                label="Phone"
                                value={phone}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InfoTile
                                icon={<CakeIcon fontSize="small" />}
                                label="Birth date"
                                value={
                                    user.birthDate
                                        ? new Date(user.birthDate).toLocaleDateString()
                                        : '—'
                                }
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InfoTile
                                icon={<WcIcon fontSize="small" />}
                                label="Gender"
                                value={user.gender ?? '—'}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                            <InfoTile
                                icon={<BadgeIcon fontSize="small" />}
                                label="Last updated"
                                value={
                                    user.updatedAt
                                        ? new Date(user.updatedAt).toLocaleDateString()
                                        : '—'
                                }
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Box>
    )
}

export default UserDetailsDisplay
