import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FilterListIcon from '@mui/icons-material/FilterList'
import {
    Box,
    ToggleButton,
    ToggleButtonGroup,
    Typography,
    Paper,
    Stack,
    Chip,
    useTheme,
    useMediaQuery,
    Collapse,
    IconButton,
} from '@mui/material'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import {
    startOfDay,
    endOfDay,
    startOfWeek,
    endOfWeek,
    startOfMonth,
    endOfMonth,
    startOfYear,
    endOfYear,
    subDays,
    format,
    isValid,
    parseISO,
} from 'date-fns'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

export interface DateRange {
    startDate: Date | null
    endDate: Date | null
}

interface DateRangeFilterProps {
    onDateRangeChange: (dateRange: DateRange) => void
    initialDateRange?: DateRange
    urlParamName?: string
    defaultCollapsed?: boolean
}

type Preset =
    | 'today'
    | 'yesterday'
    | 'this_week'
    | 'last_week'
    | 'this_month'
    | 'last_month'
    | 'this_year'
    | 'custom'

const getPresetRange = (preset: Preset): DateRange => {
    const now = new Date()

    switch (preset) {
        case 'today':
            return {
                startDate: startOfDay(now),
                endDate: endOfDay(now),
            }
        case 'yesterday': {
            const yesterday = subDays(now, 1)
            return {
                startDate: startOfDay(yesterday),
                endDate: endOfDay(yesterday),
            }
        }
        case 'this_week':
            return {
                startDate: startOfWeek(now, { weekStartsOn: 1 }), // Monday
                endDate: endOfWeek(now, { weekStartsOn: 1 }),
            }
        case 'last_week': {
            const lastWeek = subDays(now, 7)
            return {
                startDate: startOfWeek(lastWeek, { weekStartsOn: 1 }),
                endDate: endOfWeek(lastWeek, { weekStartsOn: 1 }),
            }
        }
        case 'this_month':
            return {
                startDate: startOfMonth(now),
                endDate: endOfMonth(now),
            }
        case 'last_month': {
            const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1)
            return {
                startDate: startOfMonth(lastMonth),
                endDate: endOfMonth(lastMonth),
            }
        }
        case 'this_year':
            return {
                startDate: startOfYear(now),
                endDate: endOfYear(now),
            }
        default:
            return {
                startDate: startOfMonth(now),
                endDate: endOfMonth(now),
            }
    }
}

const formatDateRange = (dateRange: DateRange): string => {
    if (!dateRange.startDate || !dateRange.endDate) return 'Select date range'

    const start = format(dateRange.startDate, 'MMM dd, yyyy')
    const end = format(dateRange.endDate, 'MMM dd, yyyy')

    if (start === end) {
        return start
    }

    return `${start} - ${end}`
}

// Utility function to parse URL parameter value to DateRange
export const parseUrlParamToDateRange = (
    urlValue: string | null
): { preset: Preset; dateRange: DateRange } => {
    if (!urlValue) {
        const defaultRange = getPresetRange('this_month')
        return { preset: 'this_month', dateRange: defaultRange }
    }

    try {
        // Check if it's a preset
        if (
            [
                'today',
                'yesterday',
                'this_week',
                'last_week',
                'this_month',
                'last_month',
                'this_year',
            ].includes(urlValue)
        ) {
            const preset = urlValue as Preset
            const dateRange = getPresetRange(preset)
            return { preset, dateRange }
        } else {
            // Parse custom date range: "startISO_endISO"
            const [startStr, endStr] = urlValue.split('_')
            if (startStr && endStr) {
                const startDate = parseISO(startStr)
                const endDate = parseISO(endStr)
                if (isValid(startDate) && isValid(endDate)) {
                    return {
                        preset: 'custom',
                        dateRange: { startDate, endDate },
                    }
                }
            }
        }
    } catch (error) {
        console.error('Error parsing URL date range:', error)
    }

    // Fallback to default
    const defaultRange = getPresetRange('this_month')
    return { preset: 'this_month', dateRange: defaultRange }
}

// Utility function to convert DateRange to URL parameter value
export const dateRangeToUrlParam = (
    preset: Preset,
    dateRange: DateRange
): string => {
    if (preset === 'custom' && dateRange.startDate && dateRange.endDate) {
        const startISO = dateRange.startDate.toISOString()
        const endISO = dateRange.endDate.toISOString()
        return `${startISO}_${endISO}`
    }
    return preset
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
    onDateRangeChange,
    initialDateRange,
    urlParamName = 'dateRange',
    defaultCollapsed = true,
}) => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))
    const [searchParams, setSearchParams] = useSearchParams()
    const [preset, setPreset] = useState<Preset>('this_month')
    const [dateRange, setDateRange] = useState<DateRange>(
        initialDateRange || getPresetRange('this_month')
    )
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed)
    const isInitialRender = React.useRef(true)

    // Initialize from URL params on mount
    useEffect(() => {
        const urlValue = searchParams.get(urlParamName)
        const { preset: initialPreset, dateRange: initialDateRange } =
            parseUrlParamToDateRange(urlValue)

        setPreset(initialPreset)
        setDateRange(initialDateRange)
    }, [searchParams, urlParamName])

    // Update URL when date range changes (but not on initial load)
    useEffect(() => {
        // Skip the first render to avoid overwriting URL on initial load
        if (isInitialRender.current) {
            isInitialRender.current = false
            return
        }

        const urlValue = dateRangeToUrlParam(preset, dateRange)
        setSearchParams(
            (prev) => {
                const newParams = new URLSearchParams(prev)
                newParams.set(urlParamName, urlValue)
                return newParams
            },
            { replace: true }
        )

        onDateRangeChange(dateRange)
    }, [
        dateRange.startDate,
        dateRange.endDate,
        preset,
        urlParamName,
        setSearchParams,
        onDateRangeChange,
    ])

    const handlePresetChange = (
        event: React.MouseEvent<HTMLElement>,
        newPreset: Preset | null
    ) => {
        if (newPreset !== null) {
            setPreset(newPreset)
            if (newPreset !== 'custom') {
                const newRange = getPresetRange(newPreset)
                setDateRange(newRange)
            }
        }
    }

    const handleStartDateChange = (date: Date | null) => {
        setDateRange((prev) => ({ ...prev, startDate: date }))
        setPreset('custom')
    }

    const handleEndDateChange = (date: Date | null) => {
        setDateRange((prev) => ({ ...prev, endDate: date }))
        setPreset('custom')
    }

    const toggleCollapse = () => {
        setIsCollapsed(!isCollapsed)
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Paper elevation={1} sx={{ mb: 1, overflow: 'hidden' }}>
                {/* Header with toggle */}
                <Box
                    sx={{
                        p: { xs: 1.5, md: 2 },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        backgroundColor: theme.palette.primary.main,
                        color: theme.palette.primary.contrastText,
                        cursor: 'pointer',
                    }}
                    onClick={toggleCollapse}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterListIcon />
                        <Typography
                            variant="h6"
                            sx={{ fontSize: { xs: '1rem', md: '1.25rem' } }}
                        >
                            Date Range Filter
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {dateRange.startDate && dateRange.endDate && (
                            <Chip
                                label={formatDateRange(dateRange)}
                                color="secondary"
                                variant="filled"
                                size="small"
                                sx={{
                                    fontSize: { xs: '0.75rem', md: '0.875rem' },
                                    backgroundColor:
                                        theme.palette.secondary.main,
                                    color: theme.palette.secondary.contrastText,
                                }}
                            />
                        )}
                        <IconButton
                            size="small"
                            sx={{ color: theme.palette.primary.contrastText }}
                        >
                            {isCollapsed ? (
                                <ExpandMoreIcon />
                            ) : (
                                <ExpandLessIcon />
                            )}
                        </IconButton>
                    </Box>
                </Box>

                {/* Collapsible content */}
                <Collapse in={!isCollapsed}>
                    <Box sx={{ p: { xs: 1.5, md: 2 } }}>
                        <Stack spacing={2}>
                            <ToggleButtonGroup
                                value={preset}
                                exclusive
                                onChange={handlePresetChange}
                                aria-label="Date range preset"
                                size="small"
                                orientation={
                                    isMobile ? 'vertical' : 'horizontal'
                                }
                                sx={{
                                    '& .MuiToggleButton-root': {
                                        textTransform: 'none',
                                        fontWeight: 500,
                                        fontSize: {
                                            xs: '0.75rem',
                                            md: '0.875rem',
                                        },
                                        minWidth: { xs: 'auto', md: 'unset' },
                                        px: { xs: 1, md: 2 },
                                    },
                                }}
                            >
                                <ToggleButton value="today">Today</ToggleButton>
                                <ToggleButton value="yesterday">
                                    Yesterday
                                </ToggleButton>
                                <ToggleButton value="this_week">
                                    This Week
                                </ToggleButton>
                                <ToggleButton value="last_week">
                                    Last Week
                                </ToggleButton>
                                <ToggleButton value="this_month">
                                    This Month
                                </ToggleButton>
                                <ToggleButton value="last_month">
                                    Last Month
                                </ToggleButton>
                                <ToggleButton value="this_year">
                                    This Year
                                </ToggleButton>
                                <ToggleButton value="custom">
                                    Custom
                                </ToggleButton>
                            </ToggleButtonGroup>

                            {preset === 'custom' && (
                                <Box
                                    sx={{
                                        display: 'flex',
                                        gap: 2,
                                        alignItems: 'center',
                                        flexDirection: {
                                            xs: 'column',
                                            sm: 'row',
                                        },
                                    }}
                                >
                                    <DatePicker
                                        label="Start Date"
                                        value={dateRange.startDate}
                                        onChange={handleStartDateChange}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                fullWidth: isMobile,
                                                sx: {
                                                    minWidth: {
                                                        xs: '100%',
                                                        sm: 'auto',
                                                    },
                                                },
                                                inputProps: {
                                                    readOnly: true,
                                                },
                                            },
                                        }}
                                    />
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: {
                                                xs: 'none',
                                                sm: 'block',
                                            },
                                        }}
                                    >
                                        to
                                    </Typography>
                                    <DatePicker
                                        label="End Date"
                                        value={dateRange.endDate}
                                        onChange={handleEndDateChange}
                                        slotProps={{
                                            textField: {
                                                size: 'small',
                                                fullWidth: isMobile,
                                                sx: {
                                                    minWidth: {
                                                        xs: '100%',
                                                        sm: 'auto',
                                                    },
                                                },
                                                inputProps: {
                                                    readOnly: true,
                                                },
                                            },
                                        }}
                                    />
                                </Box>
                            )}
                        </Stack>
                    </Box>
                </Collapse>
            </Paper>
        </LocalizationProvider>
    )
}
