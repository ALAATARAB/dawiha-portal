import {
    Alert,
    Box,
    Typography,
} from '@mui/material'
import React from 'react'

interface IUserDetailsTablesTabProps {
    userId?: number | null
}

const UserDetailsTablesTab: React.FC<IUserDetailsTablesTabProps> = ({
    userId,
}) => {
    return (
        <Box sx={{ width: '100%', py: 3 }}>
            <Alert severity="info">
                <Typography variant="body2">
                    Additional user data (appointments, pregnancies, medical history) can be accessed through their respective management pages.
                </Typography>
            </Alert>
        </Box>
    )
}

export default UserDetailsTablesTab
