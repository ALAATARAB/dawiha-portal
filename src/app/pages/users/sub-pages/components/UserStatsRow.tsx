import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MedicationIcon from '@mui/icons-material/Medication'
import NotificationsIcon from '@mui/icons-material/Notifications'
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman'
import {
    Box,
    Card,
    CardContent,
    Skeleton,
    Typography,
} from '@mui/material'
import React from 'react'

import { useGetAppointmentsQuery } from '../../../../features/appointment/api/appointmentApiSlice'
import { useGetHistoriesQuery } from '../../../../features/history/api/historyApiSlice'
import { useGetMedicinesQuery } from '../../../../features/medicine/api/medicineApiSlice'
import { useGetNotificationsQuery } from '../../../../features/notification/api/notificationApiSlice'
import { useGetPregnanciesQuery } from '../../../../features/pregnancy/api/pregnancyApiSlice'

type UserStatsRowProps = {
    userId: number
}

type StatCardProps = {
    title: string
    value: number
    icon: React.ReactNode
    loading?: boolean
    accent?: string
}

const StatCard: React.FC<StatCardProps> = ({
    title,
    value,
    icon,
    loading,
    accent = 'primary.main',
}) => (
    <Card
        variant="outlined"
        sx={{
            height: '100%',
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: 2,
            },
        }}
    >
        <CardContent>
            {loading ? (
                <Skeleton variant="rounded" height={72} />
            ) : (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        justifyContent: 'space-between',
                    }}
                >
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                        >
                            {title}
                        </Typography>
                        <Typography variant="h4" component="p" fontWeight={700}>
                            {value.toLocaleString()}
                        </Typography>
                    </Box>
                    <Box sx={{ color: accent, opacity: 0.85 }}>{icon}</Box>
                </Box>
            )}
        </CardContent>
    </Card>
)

const UserStatsRow: React.FC<UserStatsRowProps> = ({ userId }) => {
    const queryArgs = { user_id: userId, page: 1, perPage: 1 }

    const { data: appointments, isFetching: loadingAppointments } =
        useGetAppointmentsQuery(queryArgs)
    const { data: histories, isFetching: loadingHistories } =
        useGetHistoriesQuery(queryArgs)
    const { data: pregnancies, isFetching: loadingPregnancies } =
        useGetPregnanciesQuery(queryArgs)
    const { data: medicines, isFetching: loadingMedicines } =
        useGetMedicinesQuery(queryArgs)
    const { data: notifications, isFetching: loadingNotifications } =
        useGetNotificationsQuery({ receiver_id: userId, page: 1, perPage: 1 })

    const stats = [
        {
            title: 'Appointments',
            value: appointments?.meta?.total ?? 0,
            icon: <CalendarMonthIcon sx={{ fontSize: 40 }} />,
            loading: loadingAppointments,
            accent: '#1976d2',
        },
        {
            title: 'Medical history',
            value: histories?.meta?.total ?? 0,
            icon: <HistoryEduIcon sx={{ fontSize: 40 }} />,
            loading: loadingHistories,
            accent: '#7b1fa2',
        },
        {
            title: 'Pregnancies',
            value: pregnancies?.meta?.total ?? 0,
            icon: <PregnantWomanIcon sx={{ fontSize: 40 }} />,
            loading: loadingPregnancies,
            accent: '#c2185b',
        },
        {
            title: 'Medicines',
            value: medicines?.meta?.total ?? 0,
            icon: <MedicationIcon sx={{ fontSize: 40 }} />,
            loading: loadingMedicines,
            accent: '#00838f',
        },
        {
            title: 'Notifications',
            value: notifications?.meta?.total ?? 0,
            icon: <NotificationsIcon sx={{ fontSize: 40 }} />,
            loading: loadingNotifications,
            accent: '#ef6c00',
        },
    ]

    return (
        <Box
            sx={{
                display: 'grid',
                gap: 2,
                mb: 3,
                gridTemplateColumns: {
                    xs: '1fr',
                    sm: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                    lg: 'repeat(5, 1fr)',
                },
            }}
        >
            {stats.map((stat) => (
                <StatCard key={stat.title} {...stat} />
            ))}
        </Box>
    )
}

export default UserStatsRow
