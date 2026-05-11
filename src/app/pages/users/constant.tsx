import type { AdminUserEntity } from '../../common/entities/user/user.entity'

import { Chip } from '@mui/material'
import { type GridColDef } from '@mui/x-data-grid'

import { TagColors } from '../../common/@types/colors'

export const userTableColumns: GridColDef<AdminUserEntity>[] = [
    { field: 'id', headerName: 'ID', width: 72 },
    { field: 'fullName', headerName: 'Name', flex: 1, minWidth: 180 },
    {
        field: 'phoneNumber',
        headerName: 'Phone',
        width: 150,
        valueGetter: (_, row) => `${row.countryCode} ${row.phoneNumber}`,
    },
    {
        field: 'role',
        headerName: 'Role',
        width: 130,
        valueGetter: (_, row) => row.role,
    },
    {
        field: 'gender',
        headerName: 'Gender',
        width: 100,
        renderCell: (params) => {
            const gender = params.row.gender
            if (!gender) return null
            const color =
                gender === 'MALE'
                    ? TagColors.BLUE
                    : gender === 'FEMALE'
                        ? TagColors.MAGENTA
                        : TagColors.GOLD
            return (
                <Chip
                    label={gender}
                    size="small"
                    variant="outlined"
                    sx={{
                        backgroundColor: 'inherit',
                        color,
                        borderColor: color,
                    }}
                />
            )
        },
    },
    {
        field: 'isVerified',
        headerName: 'Verified',
        width: 100,
        renderCell: (params) => {
            const verified = params.row.isVerified
            const color = verified ? TagColors.GREEN : TagColors.GOLD
            return (
                <Chip
                    label={verified ? 'Yes' : 'No'}
                    size="small"
                    variant="outlined"
                    sx={{
                        backgroundColor: 'inherit',
                        color,
                        borderColor: color,
                    }}
                />
            )
        },
    },
]

export const userDefaultKeyMapper = {
    id: 'id',
    fullName: 'fullName',
    phoneNumber: 'phoneNumber',
    gender: 'gender',
    role: 'role',
    isVerified: 'isVerified',
}
