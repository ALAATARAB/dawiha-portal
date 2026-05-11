
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import {
    Box,
    Button,
    Container,
    IconButton,
    InputAdornment,
    Paper,
    Stack,
    TextField,
    Typography,
} from '@mui/material'
import { useNotifications } from '@toolpad/core/useNotifications'
import { parsePhoneNumberFromString } from 'libphonenumber-js'
import { MuiTelInput } from 'mui-tel-input'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'

import { envConfig } from '../../common/env-config/env-config'
import { useLoginMutation } from '../../features/auth/api/authApiSlice'
import { setCredentials } from '../../features/auth/state/authSlice'
import logoImage from '/logo.png'

export default function LoginPage() {
    const notifications = useNotifications()
    const [login, { isLoading }] = useLoginMutation()
    const dispatch = useDispatch()
    const { t } = useTranslation()
    const [phone, setPhone] = useState('')
    const [showPassword, setShowPassword] = useState(false)

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const fd = new FormData(form)
        const parsed = parsePhoneNumberFromString(phone)
        if (!parsed?.isValid()) {
            notifications.show(
                t('LOGIN_PHONE_INVALID', {
                    defaultValue: 'Enter a valid phone number with country code.',
                }),
                { severity: 'error', autoHideDuration: 4000 },
            )
            return
        }
        const country_code = parsed.countryCallingCode
        const phone_number = parsed.nationalNumber
        const password = String(fd.get('password') ?? '')
        try {
            const loginRes = await login({
                country_code,
                phone_number,
                password,
            }).unwrap()
            dispatch(setCredentials(loginRes))
            notifications.show(t('SUCCESSFUL_LOGIN_MESSAGE'), {
                severity: 'success',
                autoHideDuration: 3000,
            })
        } catch (error: any) {
            notifications.show(error?.data?.message ?? 'Login failed', {
                severity: 'error',
                autoHideDuration: 4000,
            })
        }
    }

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper elevation={0} variant="outlined" sx={{ p: 4 }}>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <img
                        src={logoImage}
                        alt="Dawiha Logo"
                        style={{ height: '48px', width: '48px' }}
                    />
                    <Typography variant="h4" component="h1">
                        {envConfig.PROJECT_NAME}
                    </Typography>
                </Box>
                <Typography variant="h5" gutterBottom>
                    {t('LOGIN_PAGE_TITLE', { defaultValue: 'Sign in' })}
                </Typography>
                <Typography color="text.secondary" sx={{ mb: 3 }}>
                    {t('LOGIN_PAGE_SUBTITLE', {
                        defaultValue:
                            'Admin portal — use your phone number (with country) and password.',
                    })}
                </Typography>
                <Box component="form" onSubmit={onSubmit} noValidate>
                    <Stack spacing={2}>
                        <MuiTelInput
                            value={phone}
                            onChange={setPhone}
                            defaultCountry="SA"
                            required
                            fullWidth
                            label={t('PHONE_NUMBER', { defaultValue: 'Phone number' })}
                            autoComplete="tel"
                            name="phone"
                            autoFocus
                        />
                        <TextField
                            name="password"
                            label={t('PASSWORD', { defaultValue: 'Password' })}
                            type={showPassword ? 'text' : 'password'}
                            required
                            fullWidth
                            autoComplete="current-password"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label={
                                                showPassword
                                                    ? t('HIDE_PASSWORD', {
                                                        defaultValue: 'Hide password',
                                                    })
                                                    : t('SHOW_PASSWORD', {
                                                        defaultValue: 'Show password',
                                                    })
                                            }
                                            onClick={() =>
                                                setShowPassword((v) => !v)
                                            }
                                            onMouseDown={(e) =>
                                                e.preventDefault()
                                            }
                                            edge="end"
                                        >
                                            {showPassword ? (
                                                <VisibilityOff />
                                            ) : (
                                                <Visibility />
                                            )}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={isLoading}
                            fullWidth
                        >
                            {isLoading
                                ? t('LOADING', { defaultValue: 'Signing in…' })
                                : t('LOGIN', { defaultValue: 'Login' })}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Container>
    )
}
