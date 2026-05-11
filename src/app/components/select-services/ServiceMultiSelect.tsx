import {
    Autocomplete,
    Chip,
    CircularProgress,
    TextField,
} from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

// import {
//     type ServiceRow,
//     useGetServicesQuery,
// } from '../../features/service/api/serviceApiSlice' // Removed - service feature no longer exists

// Placeholder types and hooks for removed service feature
type ServiceRow = { id: number; name: string }
const useGetServicesQuery = () => ({ data: { data: [] }, isFetching: false, isSuccess: false })

const PER_PAGE = 25

export type ServiceMultiSelectProps = {
    value: number[]
    onChange: (ids: number[]) => void
    disabled?: boolean
    label?: string
    placeholder?: string
    helperText?: string
    fullWidth?: boolean
}

function stubRow(id: number): ServiceRow {
    return {
        id,
        ar_name: '',
        code: '',
        price: 0,
        expected_duration: 0,
        type: 'NORMAL',
        is_available: true,
        category_id: 0,
        displayName: `ID: ${id}`,
    }
}

/**
 * Multi-select fed by `GET /api/v1/admin/services` with paginated listbox (infinite scroll).
 */
export const ServiceMultiSelect: React.FC<ServiceMultiSelectProps> = ({
    value,
    onChange,
    disabled = false,
    label = 'Services',
    placeholder = 'Search services from catalog',
    helperText,
    fullWidth = true,
}) => {
    const [page, setPage] = useState(1)
    const [options, setOptions] = useState<ServiceRow[]>([])
    const [inputSearch, setInputSearch] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const isFetchingMoreRef = useRef(false)

    useEffect(() => {
        const t = window.setTimeout(() => {
            setDebouncedSearch(inputSearch.trim())
        }, 350)
        return () => window.clearTimeout(t)
    }, [inputSearch])

    useEffect(() => {
        setPage(1)
        setOptions([])
    }, [debouncedSearch])

    const { data, isFetching, isSuccess } = useGetServicesQuery({
        page,
        perPage: PER_PAGE,
        name: debouncedSearch.length > 0 ? debouncedSearch : undefined,
    })

    const totalCount = data?.totalCount ?? 0

    useEffect(() => {
        if (isSuccess && data?.data) {
            const list = data.data
            setOptions((prev) => {
                const existingIds = new Set(prev.map((o: any) => o.id))
                const newUnique = list.filter((o: any) => !existingIds.has(o.id))
                return page === 1 ? [...list] : [...prev, ...newUnique]
            })
            isFetchingMoreRef.current = false
        }
    }, [data, isSuccess, page])

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget
        const { scrollTop, scrollHeight, clientHeight } = listboxNode
        const nearBottom = scrollHeight - scrollTop <= clientHeight + 48
        const loadedItems = page * PER_PAGE
        const moreItemsAvailable = loadedItems < totalCount

        if (
            nearBottom &&
            !isFetching &&
            moreItemsAvailable &&
            !isFetchingMoreRef.current
        ) {
            isFetchingMoreRef.current = true
            setPage((p) => p + 1)
        }
    }

    const selectedOptions: ServiceRow[] = React.useMemo(() => {
        const ids = value ?? []
        const rows = ids.map((id) => {
            const found = options.find((o) => o.id === id)
            return found ?? stubRow(id)
        })
        return rows
    }, [value, options])

    return (
        <Autocomplete<ServiceRow, true, false, false>
            multiple
            disableCloseOnSelect
            fullWidth={fullWidth}
            size="small"
            options={options}
            loading={isFetching && page === 1}
            disabled={disabled}
            value={selectedOptions}
            onChange={(_, newValue) => onChange(newValue.map((r) => r.id))}
            onInputChange={(_, v, reason) => {
                if (reason === 'input') setInputSearch(v)
            }}
            getOptionLabel={(o) =>
                o.displayName?.trim()
                    ? `${o.displayName} (${o.code || o.id})`
                    : `ID: ${o.id}`
            }
            isOptionEqualToValue={(a, b) => a.id === b.id}
            filterOptions={(x) => x}
            ListboxProps={{ onScroll: handleScroll }}
            renderTags={(tagValue, getTagProps) =>
                tagValue.map((opt, i) => (
                    <Chip
                        {...getTagProps({ index: i })}
                        key={opt.id}
                        label={opt.displayName || `ID: ${opt.id}`}
                        size="small"
                    />
                ))
            }
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
                    placeholder={placeholder}
                    helperText={helperText}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isFetching ? (
                                    <CircularProgress color="inherit" size={20} />
                                ) : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                />
            )}
        />
    )
}
