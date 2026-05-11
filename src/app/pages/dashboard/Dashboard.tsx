import type { DashboardCounts } from '../../features/dashboard/api/dashboardApiSlice'

import BuildIcon from '@mui/icons-material/Build'
import EventAvailableIcon from '@mui/icons-material/EventAvailable'
import ImageIcon from '@mui/icons-material/Image'
import PeopleIcon from '@mui/icons-material/People'
import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Grid,
    Skeleton,
    Typography,
} from '@mui/material'
import React from 'react'
import {
    Cell,
    Legend,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
} from 'recharts'

import DailyActivityChart from './components/DailyActivityChart'
import { getCategoryName } from '../../common/entities/category/category.entity'
import { getApiV1Url } from '../../common/env-config/env-config'
import { useGetCategoriesQuery } from '../../features/category/api/categoryApiSlice'
import {
    useGetDashboardCountsQuery,
} from '../../features/dashboard/api/dashboardApiSlice'
// import { useGetServicesQuery } from '../../features/service/api/serviceApiSlice' // Removed - service feature no longer exists

const BOOKING_STATUS_COLORS = ['#1976d2', '#2e7d32', '#ed6c02', '#d32f2f', '#9e9e9e']
const CATEGORY_COLORS = ['#7b1fa2', '#0288d1', '#388e3c', '#f57c00', '#c62828', '#5d4037']

const defaultCounts: DashboardCounts = {
    totalUsers: 0,
    totalProviders: 0,
    totalBookings: 0,
}

function normalizeImageUrl(url?: string | null): string | undefined {
    if (!url) return undefined
    if (/^https?:\/\//i.test(url)) return url
    return getApiV1Url(url)
}

const StatCard: React.FC<{
    title: string
    value: number
    icon: React.ReactNode
}> = ({ title, value, icon }) => (
    <Card variant="outlined" sx={{ height: '100%' }}>
        <CardContent>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <Box>
                    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                        {title}
                    </Typography>
                    <Typography variant="h4" component="p">
                        {value.toLocaleString()}
                    </Typography>
                </Box>
                <Box sx={{ color: 'primary.main', opacity: 0.8 }}>{icon}</Box>
            </Box>
        </CardContent>
    </Card>
)

export default function Dashboard() {
    const { data: counts, isLoading } = useGetDashboardCountsQuery()
    const { data: categoriesResponse, isFetching: isCategoriesLoading } =
        useGetCategoriesQuery({
            page: 1,
            perPage: 8,
        })
    // Services feature removed - commenting out
    // const { data: servicesResponse, isFetching: isServicesLoading } =
    //     useGetServicesQuery({
    //         page: 1,
    //         perPage: 8,
    //     })

    const displayCounts = counts ?? defaultCounts
    const categories = categoriesResponse?.data ?? []
    const services: never[] = [] // servicesResponse?.data ?? []

    const bookingStatusData = [
        { name: 'Pending', value: 12 },
        { name: 'Confirmed', value: 28 },
        { name: 'In progress', value: 15 },
        { name: 'Completed', value: 42 },
        { name: 'Cancelled', value: 8 },
    ]
    const categoriesData = [
        { name: 'Plumbing', value: 24 },
        { name: 'Electrical', value: 18 },
        { name: 'Cleaning', value: 22 },
        { name: 'Gardening', value: 14 },
        { name: 'Moving', value: 10 },
        { name: 'Other', value: 12 },
    ]

    return (
        <Box sx={{ py: 1 }}>
            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12, sm: 4 }}>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={100} />
                    ) : (
                        <StatCard
                            title="Total users"
                            value={displayCounts.totalUsers}
                            icon={<PeopleIcon sx={{ fontSize: 40 }} />}
                        />
                    )}
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={100} />
                    ) : (
                        <StatCard
                            title="Total providers"
                            value={displayCounts.totalProviders}
                            icon={<BuildIcon sx={{ fontSize: 40 }} />}
                        />
                    )}
                </Grid>
                <Grid size={{ xs: 12, sm: 4 }}>
                    {isLoading ? (
                        <Skeleton variant="rounded" height={100} />
                    ) : (
                        <StatCard
                            title="Total bookings"
                            value={displayCounts.totalBookings}
                            icon={<EventAvailableIcon sx={{ fontSize: 40 }} />}
                        />
                    )}
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mb: 3 }}>
                <Grid size={{ xs: 12 }}>
                    <DailyActivityChart
                        title="Daily activity"
                        dataKey="count"
                        color="#1976d2"
                    />
                </Grid>
            </Grid>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Booking status
                            </Typography>
                            <Box sx={{ width: '100%', height: 320 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={bookingStatusData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {bookingStatusData.map((_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        BOOKING_STATUS_COLORS[
                                                        index % BOOKING_STATUS_COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Categories used
                            </Typography>
                            <Box sx={{ width: '100%', height: 320 }}>
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={categoriesData}
                                            dataKey="value"
                                            nameKey="name"
                                            cx="50%"
                                            cy="50%"
                                            outerRadius={100}
                                            label={({ name, percent }) =>
                                                `${name} ${(percent * 100).toFixed(0)}%`
                                            }
                                        >
                                            {categoriesData.map((_, index) => (
                                                <Cell
                                                    key={index}
                                                    fill={
                                                        CATEGORY_COLORS[
                                                        index % CATEGORY_COLORS.length
                                                        ]
                                                    }
                                                />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend />
                                    </PieChart>
                                </ResponsiveContainer>
                            </Box>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <Grid container spacing={3} sx={{ mt: 0.5 }}>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Categories images
                            </Typography>
                            {isCategoriesLoading ? (
                                <Skeleton variant="rounded" height={180} />
                            ) : categories.length === 0 ? (
                                <Typography color="text.secondary">
                                    No categories found
                                </Typography>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fill, minmax(160px, 1fr))',
                                        gap: 1.5,
                                    }}
                                >
                                    {categories.map((category: any) => (
                                        <Box
                                            key={String(category.id)}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1.5,
                                                p: 1,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: 1,
                                            }}
                                        >
                                            <Avatar
                                                src={normalizeImageUrl(
                                                    category.icon?.url
                                                )}
                                                variant="rounded"
                                                sx={{
                                                    width: 44,
                                                    height: 44,
                                                    bgcolor: 'action.selected',
                                                }}
                                            >
                                                <ImageIcon fontSize="small" />
                                            </Avatar>
                                            <Typography
                                                variant="body2"
                                                sx={{ lineHeight: 1.3 }}
                                            >
                                                {getCategoryName(category)}
                                            </Typography>
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
                <Grid size={{ xs: 12, lg: 6 }}>
                    <Card variant="outlined" sx={{ height: '100%' }}>
                        <CardContent>
                            <Typography variant="h6" gutterBottom>
                                Services images
                            </Typography>
                            {false ? ( // isServicesLoading - Services feature removed
                                <Skeleton variant="rounded" height={180} />
                            ) : services.length === 0 ? (
                                <Typography color="text.secondary">
                                    No services found (Services feature removed)
                                </Typography>
                            ) : (
                                <Box
                                    sx={{
                                        display: 'grid',
                                        gridTemplateColumns:
                                            'repeat(auto-fill, minmax(160px, 1fr))',
                                        gap: 1.5,
                                    }}
                                >
                                    {/* Services feature removed - this will never render since services is empty */}
                                    {services.map((service: any) => (
                                        <Box
                                            key={String(service.id)}
                                            sx={{
                                                border: '1px solid',
                                                borderColor: 'divider',
                                                borderRadius: 1.5,
                                                p: 1,
                                            }}
                                        >
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1,
                                                    mb: 0.75,
                                                }}
                                            >
                                                <Avatar
                                                    src={normalizeImageUrl(
                                                        (
                                                            service as unknown as {
                                                                photo?: {
                                                                    url?: string | null
                                                                } | null
                                                            }
                                                        ).photo?.url
                                                    )}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 44,
                                                        height: 44,
                                                        bgcolor: 'action.selected',
                                                    }}
                                                >
                                                    <ImageIcon fontSize="small" />
                                                </Avatar>
                                                <Typography
                                                    variant="body2"
                                                    sx={{ lineHeight: 1.3 }}
                                                >
                                                    {service.displayName}
                                                </Typography>
                                            </Box>
                                            <Chip
                                                label={service.type}
                                                size="small"
                                                variant="outlined"
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Box>
    )
}
