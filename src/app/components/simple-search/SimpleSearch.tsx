import { TextField, InputAdornment } from '@mui/material'
import { debounce } from 'lodash'
import React, { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

interface ISimpleSearchProps {
    searchParamKeyName?: string
}

export const SimpleSearch: React.FC<ISimpleSearchProps> = ({
    searchParamKeyName = 'searchKey',
}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    const [search, setSearch] = useState(
        searchParams.get(searchParamKeyName) ?? ''
    )

    const debouncedSetSearchParams = useMemo(() => {
        return debounce((value: string) => {
            if (value) {
                searchParams.set(searchParamKeyName, value)
            } else {
                searchParams.delete(searchParamKeyName)
            }
            setSearchParams(searchParams)
        }, 500)
    }, [searchParams, setSearchParams])

    useEffect(() => {
        if (!search) {
            searchParams.delete(searchParamKeyName)
        }
    }, [search])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearch(value)
        debouncedSetSearchParams(value)
    }

    return (
        <TextField
            placeholder="Search"
            size="small"
            value={search}
            onChange={handleChange}
            sx={{
                width: 200,
                '& .MuiInputBase-root': {
                    height: 32,
                    fontSize: '0.75rem',
                    paddingRight: 1,
                },
                '& input': {
                    padding: '6px 8px',
                },
            }}
            InputProps={{
                startAdornment: (
                    <InputAdornment
                        position="start"
                        sx={{ fontSize: '1.1rem' }}
                    >
                        🔍
                    </InputAdornment>
                ),
            }}
        />
    )
}
