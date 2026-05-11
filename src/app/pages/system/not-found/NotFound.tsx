import { Typography, Button, Container } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
    const navigate = useNavigate()

    return (
        <Container
            maxWidth="md"
            sx={{
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                py: 6,
            }}
        >
            <Typography
                variant="h1"
                color="primary"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    fontSize: { xs: '6rem', md: '8rem' },
                }}
            >
                404
            </Typography>
            <Typography variant="h5" gutterBottom>
                Oops! Page not found.
            </Typography>
            <Typography variant="body1" sx={{ mb: 4 }}>
                The page you are looking for doesn't exist or has been moved.
            </Typography>

            <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => navigate('/')}
            >
                Go to Homepage
            </Button>

            {/* Optional image or illustration */}
            {/* <Box component="img" src="/404-illustration.svg" alt="404 Illustration" sx={{ mt: 4, width: '100%', maxWidth: 400 }} /> */}
        </Container>
    )
}

export default NotFound
