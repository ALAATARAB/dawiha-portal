import LocalHospitalIcon from '@mui/icons-material/LocalHospital'
import ScheduleIcon from '@mui/icons-material/Schedule'
import StarIcon from '@mui/icons-material/Star'
import {
    Box,
    Chip,
    Grid,
    Link,
    Skeleton,
    Stack,
    Typography,
} from '@mui/material'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { ProviderType } from '../../../../common/entities/provider/provider.entity'

import { useGetProviderAvailabilitiesQuery } from '../../../../features/provider-availability/api/providerAvailabilityApiSlice'
import { useGetProviderRatingsQuery } from '../../../../features/provider-rating/api/providerRatingApiSlice'
import { useGetProvidersQuery } from '../../../../features/provider/api/providerApiSlice'

import UserDetailsSectionCard from './UserDetailsSectionCard'

type UserProviderSectionProps = {
    userId: number
}

const typeColors: Record<
    ProviderType,
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = {
    DOCTOR: 'primary',
    NURSE: 'info',
    CLINIC: 'secondary',
    HOSPITAL: 'success',
}

const InfoField: React.FC<{ label: string; value: React.ReactNode }> = ({
    label,
    value,
}) => (
    <Box>
        <Typography variant="caption" color="text.secondary" display="block">
            {label}
        </Typography>
        <Typography variant="body2" fontWeight={500}>
            {value}
        </Typography>
    </Box>
)

const UserProviderSection: React.FC<UserProviderSectionProps> = ({ userId }) => {
    const { data: providersData, isFetching: loadingProvider } =
        useGetProvidersQuery({ user_id: userId, page: 1, perPage: 1 })

    const provider = providersData?.data?.[0]

    const { data: availabilitiesData, isFetching: loadingAvailabilities } =
        useGetProviderAvailabilitiesQuery(
            { provider_id: provider?.id, page: 1, perPage: 10 },
            { skip: !provider?.id }
        )

    const { data: ratingsData, isFetching: loadingRatings } =
        useGetProviderRatingsQuery(
            { provider_id: provider?.id, page: 1, perPage: 5 },
            { skip: !provider?.id }
        )

    if (loadingProvider) {
        return <Skeleton variant="rounded" height={220} sx={{ mb: 3 }} />
    }

    if (!provider) {
        return (
            <Box sx={{ mb: 3 }}>
                <UserDetailsSectionCard
                    title="Provider profile"
                    subtitle="No provider record linked to this account"
                    icon={<LocalHospitalIcon />}
                    accentColor="#2e7d32"
                >
                    <Typography variant="body2" color="text.secondary">
                        This user has the PROVIDER role but no provider profile was
                        found. They may need to complete provider registration.
                    </Typography>
                </UserDetailsSectionCard>
            </Box>
        )
    }

    const availabilities = availabilitiesData?.data ?? []
    const ratings = ratingsData?.data ?? []

    return (
        <Box sx={{ mb: 3 }}>
            <UserDetailsSectionCard
                title="Provider profile"
                subtitle={`${provider.title} · ID #${provider.id}`}
                icon={<LocalHospitalIcon />}
                accentColor="#2e7d32"
                action={
                    <Link
                        component={RouterLink}
                        to="/providers"
                        variant="body2"
                        sx={{ color: 'inherit', fontWeight: 600 }}
                    >
                        Manage providers
                    </Link>
                }
            >
                <Grid container spacing={3}>
                    <Grid size={{ xs: 12, md: 8 }}>
                        <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
                            <Chip
                                label={provider.type}
                                size="small"
                                color={typeColors[provider.type]}
                            />
                            <Chip
                                icon={<StarIcon sx={{ fontSize: 16 }} />}
                                label={`${provider.avg.toFixed(1)} (${provider.rating_count} ratings)`}
                                size="small"
                                variant="outlined"
                            />
                            {provider.booking_fees != null && (
                                <Chip
                                    label={`Booking fee: ${provider.booking_fees}`}
                                    size="small"
                                    variant="outlined"
                                />
                            )}
                        </Stack>

                        <Grid container spacing={2}>
                            <Grid size={{ xs: 6, sm: 4 }}>
                                <InfoField
                                    label="Phone numbers"
                                    value={
                                        provider.phone_numbers?.length
                                            ? provider.phone_numbers.join(', ')
                                            : '—'
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 4 }}>
                                <InfoField
                                    label="Location"
                                    value={
                                        provider.lat && provider.lng
                                            ? `${provider.lat.toFixed(4)}, ${provider.lng.toFixed(4)}`
                                            : '—'
                                    }
                                />
                            </Grid>
                            <Grid size={{ xs: 6, sm: 4 }}>
                                <InfoField
                                    label="Categories"
                                    value={
                                        provider.categories?.length
                                            ? provider.categories.join(', ')
                                            : '—'
                                    }
                                />
                            </Grid>
                        </Grid>

                        {provider.about && (
                            <Box sx={{ mt: 2 }}>
                                <Typography
                                    variant="caption"
                                    color="text.secondary"
                                    display="block"
                                >
                                    About
                                </Typography>
                                <Typography variant="body2">
                                    {provider.about}
                                </Typography>
                            </Box>
                        )}
                    </Grid>

                    <Grid size={{ xs: 12, md: 4 }}>
                        <Stack spacing={2}>
                            <Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mb: 1 }}
                                >
                                    <ScheduleIcon
                                        fontSize="small"
                                        color="action"
                                    />
                                    <Typography variant="subtitle2">
                                        Weekly schedule
                                    </Typography>
                                </Stack>
                                {loadingAvailabilities ? (
                                    <Skeleton height={80} />
                                ) : availabilities.length === 0 ? (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No schedule configured
                                    </Typography>
                                ) : (
                                    <Stack spacing={0.5}>
                                        {availabilities.slice(0, 5).map((slot) => (
                                            <Typography
                                                key={slot.id}
                                                variant="body2"
                                            >
                                                {slot.work_day}: {slot.from} –{' '}
                                                {slot.to}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </Box>

                            <Box>
                                <Stack
                                    direction="row"
                                    spacing={1}
                                    alignItems="center"
                                    sx={{ mb: 1 }}
                                >
                                    <StarIcon fontSize="small" color="action" />
                                    <Typography variant="subtitle2">
                                        Recent ratings
                                    </Typography>
                                </Stack>
                                {loadingRatings ? (
                                    <Skeleton height={60} />
                                ) : ratings.length === 0 ? (
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        No ratings yet
                                    </Typography>
                                ) : (
                                    <Stack spacing={0.5}>
                                        {ratings.map((rating) => (
                                            <Typography
                                                key={rating.id}
                                                variant="body2"
                                            >
                                                {'★'.repeat(rating.stars)}
                                                {'☆'.repeat(5 - rating.stars)} ·{' '}
                                                {new Date(
                                                    rating.created_at
                                                ).toLocaleDateString()}
                                            </Typography>
                                        ))}
                                    </Stack>
                                )}
                            </Box>
                        </Stack>
                    </Grid>
                </Grid>
            </UserDetailsSectionCard>
        </Box>
    )
}

export default UserProviderSection
