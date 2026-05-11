import { Alert, Box } from '@mui/material'
import { useParams } from 'react-router-dom'

import UserDetailsDisplay from './components/UserDetailsDisplay'
import UserDetailsTablesTab from './components/UserDetailsTablesTab'
import { useGetOneUserQuery } from '../../../features/user/api/userApiSlice'
import LoadingPage from '../../system/loading/LoadingPage'

const ViewUserDetails = () => {
    const { id } = useParams()
    const { data: userData, isFetching, isError } = useGetOneUserQuery(
        Number(id),
        { skip: !id || Number.isNaN(Number(id)) }
    )
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
        <>
            <UserDetailsDisplay user={userData} />
            <div style={{ paddingBottom: '5px' }}>
                <UserDetailsTablesTab userId={Number(id)} />
            </div>
        </>
    )
}

export default ViewUserDetails
