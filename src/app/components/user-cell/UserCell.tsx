import {
    Avatar,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export interface User {
    id: number
    phoneNumber: string
    userName: string
    profilePicture: string
}

const UserModal: React.FC<{
    open: boolean
    onClose: () => void
    user: User | null
}> = ({ open, onClose, user }) => {
    const navigate = useNavigate()

    if (!user) return null

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>User Details</DialogTitle>
            <DialogContent
                sx={{ display: 'flex', alignItems: 'center', gap: 2 }}
            >
                <Avatar
                    src={user.profilePicture}
                    alt={user.userName}
                    sx={{ width: 64, height: 64 }}
                />
                <div>
                    <Typography variant="h6">{user.userName}</Typography>
                    <Typography variant="body2">{user.phoneNumber}</Typography>
                </div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={() => {
                        navigate(`/users/${user.id}`)
                        onClose()
                    }}
                    color="primary"
                    variant="contained"
                >
                    Navigate to User Profile
                </Button>
                <Button onClick={onClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default function UserCell({ user }: { user: User }) {
    const [open, setOpen] = useState(false)

    return (
        <React.Fragment>
            <div onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                {user.userName}
            </div>
            <UserModal open={open} onClose={() => setOpen(false)} user={user} />
        </React.Fragment>
    )
}
