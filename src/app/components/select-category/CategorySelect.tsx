import type { CategoryEntity } from '../../common/entities/category/category.entity'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'

import { getCategoryName } from '../../common/entities/category/category.entity'
import { useGetCategoriesQuery } from '../../features/category/api/categoryApiSlice'

export type CategoryOption = { id: number; name: string }

const PER_PAGE = 15

type CategorySelectProps = {
    value: number | null
    onChange: (parentId: number | null) => void
    disabled?: boolean
    /** When editing, pass the current category id so it cannot be selected as its own parent */
    disabledOptionId?: number | null
    label?: string
    fullWidth?: boolean
}

export const CategorySelect: React.FC<CategorySelectProps> = ({
    value,
    onChange,
    disabled = false,
    disabledOptionId,
    label = 'Parent category',
    fullWidth = true,
}) => {
    const [page, setPage] = useState(1)
    const [options, setOptions] = useState<CategoryOption[]>([])
    const isFetchingMoreRef = useRef(false)

    const { data, isFetching, isSuccess } = useGetCategoriesQuery({
        page,
        perPage: PER_PAGE,
    })

    const totalCount = data?.meta?.total ?? 0

    useEffect(() => {
        if (isSuccess && data?.data) {
            const list = data.data as (CategoryEntity & { name: string })[]
            setOptions((prev) => {
                const existingIds = new Set(prev.map((o) => o.id))
                const newUnique = list
                    .map((c) => ({ id: c.id, name: c.name ?? getCategoryName(c) }))
                    .filter((o) => !existingIds.has(o.id))
                return page === 1
                    ? list.map((c) => ({
                        id: c.id,
                        name: c.name ?? getCategoryName(c),
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

    const selectedOption: CategoryOption | null =
        value != null
            ? options.find((o) => o.id === value) ?? { id: value, name: `ID: ${value}` }
            : null

    const handleChange = (_: unknown, newValue: CategoryOption | null) => {
        onChange(newValue?.id ?? null)
    }

    const isOptionDisabled = (option: CategoryOption) =>
        disabledOptionId != null && option.id === disabledOptionId

    return (
        <Autocomplete<CategoryOption>
            fullWidth={fullWidth}
            size="small"
            getOptionLabel={(option) => `${option.name} (ID: ${option.id})`}
            options={options}
            loading={isFetching}
            onChange={handleChange}
            value={selectedOption}
            filterOptions={(x) => x}
            getOptionDisabled={isOptionDisabled}
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
