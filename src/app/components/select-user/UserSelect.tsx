import type { SelectUserDto } from '../../common/dtos/user/select-user.dto'

import { Autocomplete, CircularProgress, TextField } from '@mui/material'
import { debounce } from 'lodash'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { useSelectUserQuery } from '../../features/user/api/selectUserApiSlice'
import './style.css'

type UserOption = {
    id: number
    name: string
}

const PER_PAGE = 10

export const UserSelect: React.FC = () => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState<string>(searchParams.get('name') ?? '')
    const [page, setPage] = useState(1)
    const [options, setOptions] = useState<UserOption[]>([])
    const [selectedUser, setSelectedUser] = useState<UserOption | null>(
        searchParams.get('userId')
            ? {
                  id: Number(searchParams.get('userId')),
                  name: searchParams.get('name') as string,
              }
            : null
    )

    const isFetchingMoreRef = useRef(false)

    const { data, isFetching, isSuccess } = useSelectUserQuery({
        name: search || null,
        page,
        perPage: PER_PAGE,
    } as SelectUserDto)

    const totalCount = data?.totalCount ?? 0

    const debouncedSearch = useMemo(
        () =>
            debounce((value: string) => {
                setPage(1)
                setOptions([])
                setSearch(value)
            }, 500),
        []
    )

    const handleInputChange = (_: any, value: string) => {
        debouncedSearch(value)
    }

    useEffect(() => {
        if (isSuccess && data?.data) {
            setOptions((prev) => {
                const existingIds = new Set(prev.map((u) => u.id))
                const newUnique = data.data.filter(
                    (user: { id: number; name: string }) =>
                        !existingIds.has(user.id)
                )
                return page === 1 ? data.data : [...prev, ...newUnique]
            })
            isFetchingMoreRef.current = false
        }
    }, [data, isSuccess, page])
    useEffect(() => {
        if (search) {
            searchParams.set('name', search)
            setSearchParams(searchParams)
        } else {
            searchParams.delete('name')
            setSearchParams(searchParams)
        }
    }, [search])
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

    const handleChange = (_: any, newValue: UserOption | null) => {
        setSelectedUser(newValue)
        if (newValue) {
            searchParams.set('userId', newValue.id.toString())
            searchParams.set('name', newValue.name.toString())
            setSearchParams(searchParams)
        } else {
            searchParams.delete('userId')
            searchParams.delete('name')
            setSearchParams(searchParams)
        }
    }

    return (
        <div className="user-select">
            <Autocomplete
                sx={{
                    width: 200,

                    '& .MuiInputBase-root': {
                        height: 32,
                        fontSize: '0.75rem',
                        paddingRight: 1,
                        paddingTop: 1,
                    },
                    '& .MuiSelect-select': {
                        padding: '6px 8px',
                        alignSelf: 'center',
                        textAlign: 'start',
                    },
                }}
                getOptionLabel={(option) => option.name}
                options={options}
                loading={isFetching}
                onInputChange={handleInputChange}
                onChange={handleChange}
                value={selectedUser}
                filterOptions={(x) => x}
                ListboxProps={{
                    onScroll: handleScroll,
                }}
                size="small"
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Select user"
                        // sx={{
                        //     '& .MuiInputBase-root': {
                        //         height: 40,
                        //         fontSize: '0.775rem',
                        //     },
                        //     '& input': {
                        //         padding: 0,
                        //     },
                        // }}
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isFetching ? (
                                        <CircularProgress
                                            color="inherit"
                                            size={16}
                                        />
                                    ) : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                    />
                )}
            />
        </div>
    )
}
