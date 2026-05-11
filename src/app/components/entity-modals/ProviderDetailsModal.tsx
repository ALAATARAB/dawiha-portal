import { Dialog, DialogTitle, DialogContent, DialogActions, Button, CircularProgress, Box, Typography, Chip, Grid } from '@mui/material'
import { useGetProviderQuery } from '../../features/provider/api/providerApiSlice'
import { type ProviderType } from '../../common/entities/provider/provider.entity'

interface ProviderDetailsModalProps {
    providerId: number | null
    open: boolean
    onClose: () => void
}

const typeColors: Record<ProviderType, 'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'> = {
    DOCTOR: 'primary',
    NURSE: 'info',
    CLINIC: 'secondary',
    HOSPITAL: 'success',
}

export const ProviderDetailsModal = ({ providerId, open, onClose }: ProviderDetailsModalProps) => {
    const { data: provider, isLoading, error } = useGetProviderQuery(providerId!, {
        skip: !providerId || !open,
    })

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
            <DialogTitle>Provider Details</DialogTitle>
            <DialogContent>
                {isLoading && (
                    <Box display="flex" justifyContent="center" p={3}>
                        <CircularProgress />
                    </Box>
                )}
                {error && (
                    <Box p={2}>
                        <Typography color="error">Failed to load provider details</Typography>
                    </Box>
                )}
                {provider && (
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Provider ID
                            </Typography>
                            <Typography variant="body1">{provider.id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Title
                            </Typography>
                            <Typography variant="body1">{provider.title}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Type
                            </Typography>
                            <Chip 
                                label={provider.type} 
                                size="small" 
                                color={typeColors[provider.type]} 
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                User ID
                            </Typography>
                            <Typography variant="body1">{provider.user_id}</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Booking Fees
                            </Typography>
                            <Typography variant="body1">
                                {provider.booking_fees ? `$${provider.booking_fees}` : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Location
                            </Typography>
                            <Typography variant="body1">
                                {provider.lat && provider.lng 
                                    ? `${provider.lat.toFixed(4)}, ${provider.lng.toFixed(4)}`
                                    : '-'
                                }
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                                Phone Numbers
                            </Typography>
                            <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {provider.phone_numbers && provider.phone_numbers.length > 0 ? (
                                    provider.phone_numbers.map((phone, index) => (
                                        <Chip key={index} label={phone} size="small" />
                                    ))
                                ) : (
                                    <Typography variant="body2">-</Typography>
                                )}
                            </Box>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="caption" color="text.secondary">
                                Categories
                            </Typography>
                            <Box sx={{ mt: 0.5, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                                {provider.categories && provider.categories.length > 0 ? (
                                    provider.categories.map((category, index) => (
                                        <Chip key={index} label={category} size="small" color="primary" />
                                    ))
                                ) : (
                                    <Typography variant="body2">-</Typography>
                                )}
                            </Box>
                        </Grid>
                        {provider.about && (
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary">
                                    About
                                </Typography>
                                <Typography variant="body2">{provider.about}</Typography>
                            </Grid>
                        )}
                        {provider.description && (
                            <Grid item xs={12}>
                                <Typography variant="caption" color="text.secondary">
                                    Description
                                </Typography>
                                <Typography variant="body2">{provider.description}</Typography>
                            </Grid>
                        )}
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Created At
                            </Typography>
                            <Typography variant="body1">
                                {provider.created_at ? new Date(provider.created_at).toLocaleString() : '-'}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Typography variant="caption" color="text.secondary">
                                Updated At
                            </Typography>
                            <Typography variant="body1">
                                {provider.updated_at ? new Date(provider.updated_at).toLocaleString() : '-'}
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
