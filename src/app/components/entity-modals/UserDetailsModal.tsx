import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Box, Typography, Chip, Grid } from '@mui/material'
import { useGetOneUserQuery } from '../../features/user/api/userApiSlice'

interface UserDetailsModalProps {
    userId: number | null
    open: boolean
    onClose: () => void
}

export const UserDetailsModal = ({ userId, open, onClose }: UserDetailsModalProps) => {
    const { data: user, isLoading, error } = useGetOneUserQuery(userId!, {
        skip: !userId || !open,
    })

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent>
                {isLoading && (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Box p={2}>
                        <Typography color="error">Failed to load user details</Typography>
                    </Box>
                )}
                {user && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                User ID
                            </Typography>
                            <Typography variant="body1">{user.id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Full Name
                            </Typography>
                            <Typography variant="body1">{user.fullName || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Phone Number
                            </Typography>
                            <Typography variant="body1">{user.phoneNumber || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Country Code
                            </Typography>
                            <Typography variant="body1">{user.countryCode || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Gender
                            </Typography>
                            <Typography variant="body1">{user.gender || '-'}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Role
                            </Typography>
                            <Chip label={user.role} size="small" color="primary" />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Verified Status
                            </Typography>
                            <Chip
                                label={user.isVerified ? 'Verified' : 'Not Verified'}
                                size="small"
                                color={user.isVerified ? 'success' : 'warning'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Birth Date
                            </Typography>
                            <Typography variant="body1">
                                {user.birthDate ? new Date(user.birthDate).toLocaleDateString() : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Created At
                            </Typography>
                            <Typography variant="body1">
                                {user.createdAt ? new Date(user.createdAt).toLocaleString() : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Updated At
                            </Typography>
                            <Typography variant="body1">
                                {user.updatedAt ? new Date(user.updatedAt).toLocaleString() : '-'}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}
