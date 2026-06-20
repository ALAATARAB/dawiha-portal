import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import MedicationIcon from '@mui/icons-material/Medication'
import NotificationsIcon from '@mui/icons-material/Notifications'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman'
import {
    Box,
    Chip,
    Link,
    Skeleton,
    Tab,
    Tabs,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import type { AppointmentStatus } from '../../../../common/entities/appointment/appointment.entity'
import type { HistoryType } from '../../../../common/entities/history/history.entity'
import type { PregnancyStatus } from '../../../../common/entities/pregnancy/pregnancy.entity'

import { useGetAppointmentsQuery } from '../../../../features/appointment/api/appointmentApiSlice'
import { useGetHistoriesQuery } from '../../../../features/history/api/historyApiSlice'
import { useGetMedicinesQuery } from '../../../../features/medicine/api/medicineApiSlice'
import { useGetNotificationsQuery } from '../../../../features/notification/api/notificationApiSlice'
import { useGetPregnanciesQuery } from '../../../../features/pregnancy/api/pregnancyApiSlice'

import UserDetailsSectionCard from './UserDetailsSectionCard'

interface UserDetailsTablesTabProps {
    userId: number
}

const PREVIEW_LIMIT = 8

const appointmentStatusColors: Record<
    AppointmentStatus,
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = {
    WAITING_PROVIDER_APPROVAL: 'warning',
    WAITING_CLIENT_APPROVAL: 'info',
    RESERVED: 'primary',
    COMPLETED: 'success',
    CANCELLED_BY_PROVIDER: 'error',
    CANCELLED_BY_CLIENT: 'error',
}

const historyTypeColors: Record<
    HistoryType,
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = {
    MEDICAL_RECORD: 'primary',
    PREGNANCY_HISTORY: 'secondary',
    SURGERY_HISTORY: 'error',
    ALLERGY_HISTORY: 'warning',
    MEDICATION_HISTORY: 'info',
    FAMILY_HISTORY: 'success',
}

const pregnancyStatusColors: Record<
    PregnancyStatus,
    'default' | 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning'
> = {
    ACTIVE: 'success',
    CANCELED: 'error',
    DONE: 'default',
}

type TabKey =
    | 'appointments'
    | 'history'
    | 'pregnancies'
    | 'medicines'
    | 'notifications'

const tabConfig: Array<{
    key: TabKey
    label: string
    icon: React.ReactElement
    route: string
    accentColor: string
}> = [
    {
        key: 'appointments',
        label: 'Appointments',
        icon: <CalendarMonthIcon fontSize="small" />,
        route: '/appointments',
        accentColor: '#1976d2',
    },
    {
        key: 'history',
        label: 'Medical history',
        icon: <HistoryEduIcon fontSize="small" />,
        route: '/histories',
        accentColor: '#7b1fa2',
    },
    {
        key: 'pregnancies',
        label: 'Pregnancies',
        icon: <PregnantWomanIcon fontSize="small" />,
        route: '/pregnancies',
        accentColor: '#c2185b',
    },
    {
        key: 'medicines',
        label: 'Medicines',
        icon: <MedicationIcon fontSize="small" />,
        route: '/medicines',
        accentColor: '#00838f',
    },
    {
        key: 'notifications',
        label: 'Notifications',
        icon: <NotificationsIcon fontSize="small" />,
        route: '/notifications',
        accentColor: '#ef6c00',
    },
]

function ViewAllLink({ to }: { to: string }) {
    return (
        <Link
            component={RouterLink}
            to={to}
            variant="body2"
            sx={{
                color: 'inherit',
                fontWeight: 600,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.5,
            }}
        >
            View all
            <OpenInNewIcon sx={{ fontSize: 14 }} />
        </Link>
    )
}

function EmptyRow({ colSpan, message }: { colSpan: number; message: string }) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan} align="center" sx={{ py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </TableCell>
        </TableRow>
    )
}

function LoadingRows({ colSpan }: { colSpan: number }) {
    return (
        <TableRow>
            <TableCell colSpan={colSpan}>
                <Skeleton height={120} />
            </TableCell>
        </TableRow>
    )
}

const UserDetailsTablesTab: React.FC<UserDetailsTablesTabProps> = ({
    userId,
}) => {
    const [activeTab, setActiveTab] = useState<TabKey>('appointments')

    const listArgs = { user_id: userId, page: 1, perPage: PREVIEW_LIMIT }

    const { data: appointments, isFetching: loadingAppointments } =
        useGetAppointmentsQuery(listArgs)
    const { data: histories, isFetching: loadingHistories } =
        useGetHistoriesQuery(listArgs)
    const { data: pregnancies, isFetching: loadingPregnancies } =
        useGetPregnanciesQuery(listArgs)
    const { data: medicines, isFetching: loadingMedicines } =
        useGetMedicinesQuery(listArgs)
    const { data: notifications, isFetching: loadingNotifications } =
        useGetNotificationsQuery({
            receiver_id: userId,
            page: 1,
            perPage: PREVIEW_LIMIT,
        })

    const currentTab = tabConfig.find((tab) => tab.key === activeTab)!

    const renderTable = () => {
        switch (activeTab) {
            case 'appointments':
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Date</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Provider</TableCell>
                                    <TableCell>Notes</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingAppointments ? (
                                    <LoadingRows colSpan={5} />
                                ) : !appointments?.data?.length ? (
                                    <EmptyRow
                                        colSpan={5}
                                        message="No appointments for this user"
                                    />
                                ) : (
                                    appointments.data.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.date
                                                ).toLocaleString()}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status.replace(
                                                        /_/g,
                                                        ' '
                                                    )}
                                                    size="small"
                                                    color={
                                                        appointmentStatusColors[
                                                            row.status
                                                        ]
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                #{row.provider_id}
                                            </TableCell>
                                            <TableCell>
                                                {row.user_notes || '—'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )

            case 'history':
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Consistent</TableCell>
                                    <TableCell>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingHistories ? (
                                    <LoadingRows colSpan={5} />
                                ) : !histories?.data?.length ? (
                                    <EmptyRow
                                        colSpan={5}
                                        message="No medical history records"
                                    />
                                ) : (
                                    histories.data.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.type.replace(
                                                        /_/g,
                                                        ' '
                                                    )}
                                                    size="small"
                                                    color={
                                                        historyTypeColors[
                                                            row.type
                                                        ]
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        row.consistent
                                                            ? 'Yes'
                                                            : 'No'
                                                    }
                                                    size="small"
                                                    color={
                                                        row.consistent
                                                            ? 'success'
                                                            : 'default'
                                                    }
                                                    variant={
                                                        row.consistent
                                                            ? 'filled'
                                                            : 'outlined'
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.created_at
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )

            case 'pregnancies':
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Start date</TableCell>
                                    <TableCell>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingPregnancies ? (
                                    <LoadingRows colSpan={4} />
                                ) : !pregnancies?.data?.length ? (
                                    <EmptyRow
                                        colSpan={4}
                                        message="No pregnancy records"
                                    />
                                ) : (
                                    pregnancies.data.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.status}
                                                    size="small"
                                                    color={
                                                        pregnancyStatusColors[
                                                            row.status
                                                        ]
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.start
                                                ).toLocaleDateString()}
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.created_at
                                                ).toLocaleDateString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )

            case 'medicines':
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Day</TableCell>
                                    <TableCell>Quantity</TableCell>
                                    <TableCell>Instructions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingMedicines ? (
                                    <LoadingRows colSpan={5} />
                                ) : !medicines?.data?.length ? (
                                    <EmptyRow
                                        colSpan={5}
                                        message="No medicines recorded"
                                    />
                                ) : (
                                    medicines.data.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>{row.title}</TableCell>
                                            <TableCell>
                                                {row.week_day}
                                            </TableCell>
                                            <TableCell>{row.quantity}</TableCell>
                                            <TableCell>
                                                {row.instructions || '—'}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )

            case 'notifications':
                return (
                    <TableContainer>
                        <Table size="small">
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Title</TableCell>
                                    <TableCell>Read</TableCell>
                                    <TableCell>Created</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loadingNotifications ? (
                                    <LoadingRows colSpan={5} />
                                ) : !notifications?.data?.length ? (
                                    <EmptyRow
                                        colSpan={5}
                                        message="No notifications for this user"
                                    />
                                ) : (
                                    notifications.data.map((row) => (
                                        <TableRow key={row.id} hover>
                                            <TableCell>{row.id}</TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={row.type.replace(
                                                        /_/g,
                                                        ' '
                                                    )}
                                                    size="small"
                                                    variant="outlined"
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {row.title || '—'}
                                            </TableCell>
                                            <TableCell>
                                                <Chip
                                                    label={
                                                        row.is_read
                                                            ? 'Read'
                                                            : 'Unread'
                                                    }
                                                    size="small"
                                                    color={
                                                        row.is_read
                                                            ? 'default'
                                                            : 'warning'
                                                    }
                                                />
                                            </TableCell>
                                            <TableCell>
                                                {new Date(
                                                    row.created_at
                                                ).toLocaleString()}
                                            </TableCell>
                                        </TableRow>
                                    ))
                                )}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )
        }
    }

    return (
        <Box sx={{ width: '100%', pb: 3 }}>
            <Tabs
                value={activeTab}
                onChange={(_, value: TabKey) => setActiveTab(value)}
                variant="scrollable"
                scrollButtons="auto"
                sx={{
                    mb: 2,
                    borderBottom: 1,
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                        minHeight: 48,
                        textTransform: 'none',
                        fontWeight: 600,
                    },
                }}
            >
                {tabConfig.map((tab) => (
                    <Tab
                        key={tab.key}
                        value={tab.key}
                        label={tab.label}
                        icon={tab.icon}
                        iconPosition="start"
                    />
                ))}
            </Tabs>

            <UserDetailsSectionCard
                title={currentTab.label}
                subtitle={`Latest ${PREVIEW_LIMIT} records`}
                icon={currentTab.icon}
                accentColor={currentTab.accentColor}
                action={<ViewAllLink to={currentTab.route} />}
            >
                {renderTable()}
            </UserDetailsSectionCard>
        </Box>
    )
}

export default UserDetailsTablesTab
