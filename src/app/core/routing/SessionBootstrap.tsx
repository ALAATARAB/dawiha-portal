import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { useLazyGetMeQuery } from '../../features/auth/api/authApiSlice'
import {
    logOut,
    selectCurrentToken,
    setProfile,
} from '../../features/auth/state/authSlice'

/**
 * Validates JWT on refresh and hydrates `auth.profile` from `/admin/users/me`.
 */
export default function SessionBootstrap() {
    const token = useSelector(selectCurrentToken)
    const dispatch = useDispatch()
    const [getMe, { isFetching }] = useLazyGetMeQuery()
    const bootstrapped = useRef(false)

    useEffect(() => {
        if (!token || isFetching) {
            return
        }
        if (bootstrapped.current) {
            return
        }
        bootstrapped.current = true
        void getMe()
            .unwrap()
            .then((me) => {
                dispatch(setProfile(me))
            })
            .catch(() => {
                dispatch(logOut())
            })
    }, [token, getMe, dispatch, isFetching])

    useEffect(() => {
        if (!token) {
            bootstrapped.current = false
        }
    }, [token])

    return null
}
