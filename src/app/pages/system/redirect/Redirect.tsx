import { Typography, CircularProgress, Container, Paper } from '@mui/material'

const RedirectingPage = () => {
    return (
        <Container
            maxWidth="sm"
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    padding: 4,
                    textAlign: 'center',
                    borderRadius: 3,
                    backgroundColor: 'background.paper',
                }}
            >
                <CircularProgress color="primary" sx={{ mb: 3 }} />
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 500 }}>
                    Redirecting...
                </Typography>
                <Typography variant="body1" color="text.secondary">
                    Please wait while we take you to your destination.
                </Typography>
            </Paper>
        </Container>
    )
}

export default RedirectingPage
