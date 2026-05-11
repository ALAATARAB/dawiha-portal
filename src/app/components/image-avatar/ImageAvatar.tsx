import type { IImageAvatarProps } from './constant'

import CloseIcon from '@mui/icons-material/Close'
import EditIcon from '@mui/icons-material/Edit'
import RotateRightIcon from '@mui/icons-material/RotateRight'
import ZoomInIcon from '@mui/icons-material/ZoomIn'
import ZoomOutIcon from '@mui/icons-material/ZoomOut'
import {
    Avatar,
    Badge,
    Box,
    IconButton,
    Modal,
    useMediaQuery,
    useTheme,
} from '@mui/material'
import CircularProgress from '@mui/material/CircularProgress'
import React, { useRef, useState } from 'react'

import { getStringToAvatar } from './util'

const ImageAvatar: React.FC<IImageAvatarProps> = ({
    username,
    src,
    upload = false,
    onUpload,
    width = '40px',
    height = '40px',
    borderRadius = '50%',
}) => {
    const [open, setOpen] = useState(false)
    const [rotation, setRotation] = useState(0)
    const [scale, setScale] = useState(1)
    const [localImage, setLocalImage] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)

    const theme = useTheme()
    const isDarkMode = theme.palette.mode === 'dark'

    const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
    const fileInputRef = useRef<HTMLInputElement>(null)

    const avatarImage = localImage ?? src
    const stringToAvatar = getStringToAvatar(username)

    const handleAvatarClick = () => {
        if (avatarImage) {
            setOpen(true)
        }
    }

    const handleEditClick = (e: React.MouseEvent) => {
        e.stopPropagation()
        if (upload) {
            fileInputRef.current?.click()
        }
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            if (!file.type.startsWith('image/')) {
                alert('Please upload a valid image file.')
                e.target.value = ''
                return
            }

            const reader = new FileReader()
            reader.onload = () => {
                setLocalImage(reader.result as string)
            }
            reader.readAsDataURL(file)

            setLoading(true)
            try {
                const response = await onUpload?.(file)
                if (!response) {
                    setLocalImage(null)
                }
            } finally {
                setLoading(false)
            }
        }
    }

    const handleClose = () => {
        setOpen(false)
        setRotation(0)
        setScale(1)
    }

    const handleRotate = () => setRotation((prev) => prev + 90)
    const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.2, 3))
    const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.2, 0.5))

    return (
        <>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                height={'100%'}
            >
                <Badge
                    overlap="circular"
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    badgeContent={
                        upload ? (
                            <IconButton
                                size="small"
                                sx={{
                                    bgcolor: isDarkMode
                                        ? theme.palette.grey[800]
                                        : theme.palette.grey[200],
                                    color: isDarkMode
                                        ? theme.palette.grey[100]
                                        : theme.palette.grey[900],
                                    borderRadius: '50%',
                                    boxShadow: 4,
                                    p: 0.5,
                                    '&:hover': {
                                        bgcolor: isDarkMode
                                            ? theme.palette.grey[700]
                                            : theme.palette.grey[300],
                                    },
                                }}
                                onClick={handleEditClick}
                            >
                                <EditIcon fontSize="small" />
                            </IconButton>
                        ) : null
                    }
                >
                    <Box position="relative" width={width} height={height}>
                        <Avatar
                            src={avatarImage ?? undefined}
                            onClick={handleAvatarClick}
                            sx={
                                avatarImage
                                    ? {
                                          width,
                                          height,
                                          borderRadius,
                                          cursor: 'pointer',
                                          transition: 'box-shadow 0.3s',
                                          '&:hover': {
                                              boxShadow: 4,
                                              background: 'rgba(0,0,0,0.1)',
                                              opacity: 0.2,
                                          },
                                      }
                                    : {
                                          width,
                                          height,
                                          borderRadius,
                                          ...stringToAvatar.sx,
                                      }
                            }
                            children={
                                !avatarImage ? stringToAvatar.children : ''
                            }
                        />
                        {loading && (
                            <Box
                                position="absolute"
                                top="50%"
                                left="50%"
                                sx={{
                                    transform: 'translate(-50%, -50%)',
                                    zIndex: 1,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}
                            >
                                <CircularProgress size={24} />
                            </Box>
                        )}
                    </Box>
                </Badge>
                <input
                    type="file"
                    accept="image/*"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />
            </Box>

            <Modal open={open} onClose={handleClose}>
                <Box
                    onClick={handleClose}
                    sx={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100vw',
                        height: '100vh',
                        bgcolor: 'rgba(0,0,0,0.8)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1300,
                        p: isMobile ? 2 : 4,
                    }}
                >
                    <Box
                        onClick={(e) => e.stopPropagation()}
                        sx={{
                            position: 'relative',
                            width: isMobile ? '100%' : 'auto',
                            maxWidth: '90vw',
                            maxHeight: '90vh',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{
                                position: 'absolute',
                                top: isMobile ? -35 : -25,
                                right: isMobile ? -20 : -50,
                                color: 'white',
                                zIndex: 10,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Box
                            component="img"
                            src={avatarImage ?? ''}
                            alt={username}
                            sx={{
                                maxWidth: '100%',
                                maxHeight: '80vh',
                                transform: `rotate(${rotation}deg) scale(${scale})`,
                                transition: 'transform 0.3s',
                                borderRadius: 2,
                            }}
                        />

                        <Box
                            display="flex"
                            justifyContent="center"
                            gap={2}
                            mt={2}
                            color="white"
                        >
                            <IconButton onClick={handleRotate} color="inherit">
                                <RotateRightIcon />
                            </IconButton>
                            <IconButton onClick={handleZoomIn} color="inherit">
                                <ZoomInIcon />
                            </IconButton>
                            <IconButton onClick={handleZoomOut} color="inherit">
                                <ZoomOutIcon />
                            </IconButton>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default ImageAvatar
