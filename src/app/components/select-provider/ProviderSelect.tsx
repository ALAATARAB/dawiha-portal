import type { ProviderEntity } from '../../common/entities/provider/provider.entity'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { useGetProvidersSelectQuery } from '../../features/provider/api/providerApiSlice'

export type ProviderOption = { id: number; title: string }

const PER_PAGE = 15

type ProviderSelectProps = {
    value: number | null
    onChange: (providerId: number | null) => void
    disabled?: boolean
    label?: string
    fullWidth?: boolean
}

export const ProviderSelect: React.FC<ProviderSelectProps> = ({
    value,
    onChange,
    disabled = false,
    label = 'Provider',
    fullWidth = true,
}) => {
    const [page, setPage] = useState(1)
    const [options, setOptions] = useState<ProviderOption[]>([])
    const isFetchingMoreRef = useRef(false)

    const { data, isFetching, isSuccess } = useGetProvidersSelectQuery({
        page,
        perPage: PER_PAGE,
    })

    const totalCount = data?.meta?.total ?? 0

    useEffect(() => {
        if (isSuccess && data?.data) {
            const list = data.data as ProviderEntity[]
            setOptions((prev) => {
                const existingIds = new Set(prev.map((o) => o.id))
                const newUnique = list
                    .map((p) => ({ id: p.id, title: p.title }))
                    .filter((o) => !existingIds.has(o.id))
                return page === 1
                    ? list.map((p) => ({
                        id: p.id,
                        title: p.title,
                    }))
                    : [...prev, ...newUnique]
            })
            isFetchingMoreRef.current = false
        }
    }, [data, isSuccess, page])

    const handleScroll = (event: React.SyntheticEvent) => {
        const listboxNode = event.currentTarget
        const { scrollTop, scrollHeight, clientHeight } = listboxNode
        const nearBottom = scrollHeight - scrollTop <= clientHeight + 50
        const loadedItems = page * PER_PAGE
        const moreItemsAvailable = loadedItems < totalCount

        if (
            nearBottom &&
            !isFetching &&
            moreItemsAvailable &&
            !isFetchingMoreRef.current
        ) {
            isFetchingMoreRef.current = true
            setPage((prev) => prev + 1)
        }
    }

    const selectedOption: ProviderOption | null =
        value != null
            ? options.find((o) => o.id === value) ?? { id: value, title: `ID: ${value}` }
            : null

    const handleChange = (_: unknown, newValue: ProviderOption | null) => {
        onChange(newValue?.id ?? null)
    }

    return (
        <Autocomplete<ProviderOption>
            fullWidth={fullWidth}
            size="small"
            getOptionLabel={(option) => `${option.title} (ID: ${option.id})`}
            options={options}
            loading={isFetching}
            onChange={handleChange}
            value={selectedOption}
            filterOptions={(x) => x}
            isOptionEqualToValue={(option, val) => option.id === val?.id}
            ListboxProps={{ onScroll: handleScroll }}
            disabled={disabled}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label={label}
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
