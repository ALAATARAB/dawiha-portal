import { createTheme } from '@mui/material/styles'
import { type Session } from '@toolpad/core/AppProvider'
import type { } from '@mui/x-data-grid/themeAugmentation'

export const layoutTheme = createTheme({
    typography: {
        fontFamily: '"Noto Sans", sans-serif',
        h1: { fontWeight: 700 },
        h2: { fontWeight: 600 },
        body1: { fontWeight: 300 },
        button: { textTransform: 'none' },
    },
    cssVariables: {
        colorSchemeSelector: 'data-toolpad-color-scheme',
    },
    shape: {
        borderRadius: '0.375rem',
    },
    components: {
        MuiOutlinedInput: {
            styleOverrides: {
                input: {
                    height: '35px !important',
                    padding: '6px 12px',
                    lineHeight: 1.5,
                    fontSize: '1rem',
                },
                root: {
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10B981', // Green focus border
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                containedSuccess: {
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                    '&:hover': {
                        backgroundColor: '#059669',
                    },
                },
                outlinedSuccess: {
                    borderColor: '#10B981',
                    color: '#10B981',
                    '&:hover': {
                        borderColor: '#059669',
                        backgroundColor: 'rgba(16, 185, 129, 0.08)',
                    },
                },
            },
        },
        MuiChip: {
            styleOverrides: {
                colorSuccess: {
                    backgroundColor: '#10B981',
                    color: '#FFFFFF',
                },
            },
        },
        MuiSwitch: {
            styleOverrides: {
                switchBase: {
                    '&.Mui-checked': {
                        color: '#10B981',
                        '& + .MuiSwitch-track': {
                            backgroundColor: '#10B981',
                        },
                    },
                },
            },
        },
        MuiCheckbox: {
            styleOverrides: {
                root: {
                    '&.Mui-checked': {
                        color: '#10B981',
                    },
                },
            },
        },
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: '#2563EB', // Blue from logo
                    light: '#3B82F6',
                    dark: '#1D4ED8',
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#10B981', // Green from logo
                    light: '#22C55E',
                    dark: '#059669',
                    contrastText: '#FFFFFF',
                },
                info: {
                    main: '#14B8A6', // Teal accent from logo
                    light: '#2DD4BF',
                    dark: '#0D9488',
                    contrastText: '#FFFFFF',
                },
                success: {
                    main: '#10B981', // Green for success states
                    light: '#34D399',
                    dark: '#059669',
                    contrastText: '#FFFFFF',
                },
                background: {
                    paper: '#F8FAFC',
                    default: '#F1F5F9',
                },
                DataGrid: {
                    bg: '#F8FAFC',
                    pinnedBg: '#F1F5F9',
                    headerBg: '#E2E8F0',
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: '#3B82F6', // Lighter blue for dark mode
                    light: '#60A5FA',
                    dark: '#2563EB',
                    contrastText: '#FFFFFF',
                },
                secondary: {
                    main: '#10B981', // Green from logo
                    light: '#34D399',
                    dark: '#059669',
                    contrastText: '#FFFFFF',
                },
                info: {
                    main: '#14B8A6', // Teal accent from logo
                    light: '#2DD4BF',
                    dark: '#0D9488',
                    contrastText: '#FFFFFF',
                },
                success: {
                    main: '#10B981', // Green for success states
                    light: '#34D399',
                    dark: '#059669',
                    contrastText: '#FFFFFF',
                },
                background: {
                    paper: '#1E293B',
                    default: '#0F172A',
                },
                DataGrid: {
                    bg: '#1E293B',
                    pinnedBg: '#1E293B',
                    headerBg: '#334155',
                },
            },
        },
    },
    defaultColorScheme: 'dark',
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 600,
            lg: 1200,
            xl: 1536,
        },
    },
})

export const getCurrentSession = (
    name: string = 'admin',
    email: string = 'admin@email.com',
    image: string = '/default-user-avatar.jpg'
): Session => {
    return {
        user: {
            name,
            email,
            image,
        },
    }
}
