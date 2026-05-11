import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    type SelectChangeEvent,
} from '@mui/material'
import React from 'react'
import { useSearchParams } from 'react-router-dom'

// import { ADMIN_SUBSCRIPTION_QUERY_STATUSES } from '../../features/subscription/api/subscriptionApiSlice' // Removed - subscription feature no longer exists
const ADMIN_SUBSCRIPTION_QUERY_STATUSES: string[] = [] // Placeholder

/**
 * Query `status` for `GET /admin/subscriptions` (swagger enum).
 */
export const SubscriptionStatusFilter: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const value = searchParams.get('status') ?? ''

    const onChange = (e: SelectChangeEvent<string>) => {
        const next = e.target.value
        if (next === '') {
            searchParams.delete('status')
        } else {
            searchParams.set('status', next)
        }
        searchParams.set('page', '1')
        setSearchParams(searchParams)
    }

    return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
            <InputLabel id="subscription-status-filter-label">Status</InputLabel>
            <Select
                labelId="subscription-status-filter-label"
                label="Status"
                value={value}
                onChange={onChange}
                sx={{
                    height: 32,
                    fontSize: '0.75rem',
                    '& .MuiSelect-select': { py: 0.75, px: 1 },
                }}
            >
                <MenuItem value="">
                    <em>All</em>
                </MenuItem>
                {ADMIN_SUBSCRIPTION_QUERY_STATUSES.map((s: any) => (
                    <MenuItem key={s} value={s}>
                        {s.replace(/_/g, ' ')}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
