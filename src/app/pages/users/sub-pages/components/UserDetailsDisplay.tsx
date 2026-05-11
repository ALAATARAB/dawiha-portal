import type { AdminUserEntity } from '../../../../common/entities/user/user.entity'

import { Paper, Typography, Avatar, Box, Grid } from '@mui/material'
import React from 'react'

type TUserDetailsDisplay = {
    user: AdminUserEntity
}

const UserDetailsDisplay: React.FC<TUserDetailsDisplay> = ({ user }) => {
    const phone = `${user.countryCode} ${user.phoneNumber}`

    return (
        <Box sx={{ width: '100%', position: 'relative', mt: 8 }}>
            <Avatar
                alt={user.fullName}
                sx={{
                    width: 120,
                    height: 120,
                    borderRadius: 4,
                    border: '3px solid white',
                    position: 'absolute',
                    top: 0,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: 'primary.main',
                    boxShadow: 3,
                    zIndex: 5,
                    fontSize: '3rem',
                }}
                variant="rounded"
            >
                {user.fullName.charAt(0).toUpperCase()}
            </Avatar>

            <Paper
                sx={{
                    width: '100%',
                    p: 4,
                    pt: 10,
                    boxSizing: 'border-box',
                }}
                elevation={3}
            >
                <Typography variant="h5" align="center" gutterBottom>
                    {user.fullName}
                </Typography>

                <Grid container spacing={4}>
                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Phone
                        </Typography>
                        <Box>
                            <Typography sx={{ wordBreak: 'break-all' }}>
                                {phone}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {user.isVerified ? 'Verified' : 'Not verified'}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Birth date
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>
                            {user.birthDate
                                ? new Date(user.birthDate).toLocaleDateString()
                                : '---'}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Gender
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>
                            {user.gender ?? '---'}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Role
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>
                            {user.role ?? '---'}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Created At
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>
                            {user.createdAt
                                ? new Date(user.createdAt).toLocaleDateString()
                                : '---'}
                        </Typography>
                    </Grid>

                    <Grid size={{ xs: 12, sm: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            Updated At
                        </Typography>
                        <Typography sx={{ wordBreak: 'break-all' }}>
                            {user.updatedAt
                                ? new Date(user.updatedAt).toLocaleDateString()
                                : '---'}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>
        </Box>
    )
}

export default UserDetailsDisplay
