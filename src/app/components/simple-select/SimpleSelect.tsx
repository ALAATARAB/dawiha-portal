import {
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    type SelectChangeEvent,
} from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './style.css'
interface ISimpleSelectProps<T extends string | number> {
    searchParamKeyName?: string
    enumOptions: Record<string, T> | any
    label?: string
    width?: number | string
}

export function SimpleSelect<T extends string | number>({
    searchParamKeyName = 'selectKey',
    enumOptions,
    label = 'Select',
    width = 150,
}: ISimpleSelectProps<T>) {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialValue = searchParams.get(searchParamKeyName) ?? ''

    const [selected, setSelected] = useState<string>(initialValue)

    useEffect(() => {
        const paramValue = searchParams.get(searchParamKeyName) ?? ''
        if (paramValue !== selected) {
            setSelected(paramValue)
        }
    }, [searchParams, searchParamKeyName, selected])

    const handleChange = (event: SelectChangeEvent<string>) => {
        const value = event.target.value
        setSelected(value)

        if (value) {
            searchParams.set(searchParamKeyName, value)
        } else {
            searchParams.delete(searchParamKeyName)
        }
        setSearchParams(searchParams)
    }

    return (
        <div className="simple-select">
            <FormControl
                size="small"
                sx={{
                    width,
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
            >
                <InputLabel size="small" id={`${searchParamKeyName}-label`}>
                    {label}
                </InputLabel>
                <Select
                    size="small"
                    labelId={`${searchParamKeyName}-label`}
                    value={selected}
                    label={label}
                    onChange={handleChange}
                    sx={{
                        textAlign: 'center',
                    }}
                >
                    <MenuItem value="" sx={{ textAlign: 'center' }}>
                        None
                    </MenuItem>
                    {Object.entries(enumOptions).map(([key, value]: any) => (
                        <MenuItem
                            key={value}
                            value={value}
                            sx={{ textAlign: 'center' }}
                        >
                            {key}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    )
}
