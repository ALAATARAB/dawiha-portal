import { TextField, FormControl, InputLabel } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import './style.css'

interface ISimpleNumberSearchProps {
    searchParamKeyName?: string
    label?: string
    width?: number | string
    min?: number
    max?: number
}

export function SimpleNumberSearch({
    searchParamKeyName = 'numberKey',
    label = 'Enter Number',
    width = 150,
    min,
    max,
}: ISimpleNumberSearchProps) {
    const [searchParams, setSearchParams] = useSearchParams()

    const initialValue = searchParams.get(searchParamKeyName) ?? ''
    const [value, setValue] = useState<string>(initialValue)

    useEffect(() => {
        const paramValue = searchParams.get(searchParamKeyName) ?? ''
        if (paramValue !== value) {
            setValue(paramValue)
        }
    }, [searchParams, searchParamKeyName, value])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value

        // allow empty string to reset
        if (newValue === '') {
            setValue('')
            searchParams.delete(searchParamKeyName)
            setSearchParams(searchParams)
            return
        }

        const num = Number(newValue)

        // validate range if min/max provided
        if (!isNaN(num)) {
            if (
                (min !== undefined && num < min) ||
                (max !== undefined && num > max)
            ) {
                return // ignore invalid out-of-range value
            }

            setValue(newValue)
            searchParams.set(searchParamKeyName, newValue)
            setSearchParams(searchParams)
        }
    }

    return (
        <div className="simple-number-search">
            <FormControl
                size="small"
                sx={{
                    width,
                    '& .MuiInputBase-root': {
                        height: 32,
                        fontSize: '0.75rem',
                        // paddingRight: 1,
                        // paddingTop: 1,
                    },
                }}
            >
                <InputLabel
                    shrink
                    size="small"
                    htmlFor={`${searchParamKeyName}-input`}
                >
                    {label}
                </InputLabel>
                <TextField
                    id={`${searchParamKeyName}-input`}
                    type="number"
                    size="small"
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                    inputProps={{
                        min,
                        max,
                        style: { textAlign: 'center' },
                    }}
                />
            </FormControl>
        </div>
    )
}
