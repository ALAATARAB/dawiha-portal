import { Alert, Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import UserDetailsDisplay from './components/UserDetailsDisplay'
import UserDetailsTablesTab from './components/UserDetailsTablesTab'
import UserProviderSection from './components/UserProviderSection'
import UserStatsRow from './components/UserStatsRow'
import { useGetOneUserQuery } from '../../../features/user/api/userApiSlice'
import LoadingPage from '../../system/loading/LoadingPage'

const ViewUserDetails = () => {
    const { id } = useParams()
    const userId = Number(id)
    const { data: userData, isFetching, isError } = useGetOneUserQuery(userId, {
        skip: !id || Number.isNaN(userId),
    })

    if (isFetching) {
        return <LoadingPage />
    }

    if (isError || !userData) {
        return (
            <Box sx={{ py: 2 }}>
                <Alert severity="error">
                    User not found or could not be loaded. If they are beyond the
                    first page of results, list filtering in the API is required.
                </Alert>
            </Box>
        )
    }

    return (
        <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
            <UserDetailsDisplay user={userData} />
            <UserStatsRow userId={userId} />
            {userData.role === 'PROVIDER' && (
                <UserProviderSection userId={userId} />
            )}
            <UserDetailsTablesTab userId={userId} />
        </Box>
    )
}

export default ViewUserDetails
